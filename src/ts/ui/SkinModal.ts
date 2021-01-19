import PerfectScrollbar from 'perfect-scrollbar';
import Experience from '../game/Experience';
import AccountData from "../entities/AccountData";

import { SkinConfig, SkinData, TabData } from '../utilities/Structures';

const $ = require('jquery');

const DEVBUILD = process.env.NODE_ENV == 'development';

class SkinModal {
    selectedSkinUnit: number;
    config: SkinConfig;
    pageData: any;
    tabs: TabData;

    page: number = 0;
    tab: number = 0;

    open: boolean = false;

    prevSearchVal: string = "";

    nodeImgs: Array<HTMLElement> = [];
    nodeItems: Array<HTMLElement> = [];
    nodeBtns: Array<HTMLElement> = [];
    xIcons: Array<string> = [];
    currentlyDisplayedSkins: Array<SkinData> = [];
    skinItemTemplate: HTMLElement;
    submitTemplate: HTMLElement;

    constructor() {
        this.pageData = null;
        this.selectedSkinUnit = 0;

        // if (DEVBUILD) {
        //     this.config = <SkinConfig>{
        //         listUrl: "http://localhost/skins/list",
        //         searchUrl: "http://localhost/skins/search",
        //         submitUrl: "http://localhost/skins/submit",
        //         skinBase: "https://auth.senpa.io/u/",
        //         favoriteUrl: "http://localhost/skins/favorite",
        //         fallbackUploadUrl: "http://localhost/skins/fallback-upload",
        //     }
        // } else {
        this.config = <SkinConfig>{
            listUrl: "https://auth.senpa.io/skins/list",
            searchUrl: "https://auth.senpa.io/skins/search",
            submitUrl: "https://auth.senpa.io/skins/submit",
            skinBase: "https://auth.senpa.io/u/",
            favoriteUrl: "https://auth.senpa.io/skins/favorite",
            fallbackUploadUrl: "https://auth.senpa.io/skins/fallback-upload",
        }
        // }

        this.tabs = <TabData>{
            TAB_LEVELS: 1,
            TAB_FREE: 2,
            TAB_MYSKINS: 3,
            TAB_FAVORITES: 4,
            TAB_SUBMITSKIN: 5
        }
    }

    onSkinUpdate(unit: number, name: string) {
        throw new Error('Not implemented');
    }

    changeOnSkinUpdate(cb) {
        this.onSkinUpdate = cb;
    }

    getSelectedSkinInputEl() {
        return this.selectedSkinUnit == 0 ? $("#skin-preview-1") : $("#skin-preview-2");
    }

    getSelectedSkinURL() {
        const el = this.getSelectedSkinInputEl();
        return el.val();
    }

    setPage(p: number, force: boolean) {
        p = Math.max(1, p);

        if (this.page === p && force != null && force != true) return;
        this.page = p;

        const btn = (i) => $("#skinsPagin .pagination-" + i);

        if (p < 2) {
            btn(0).hide();
            btn(1).hide();
        } else {
            btn(0).show();
            btn(1).show();
        }

        btn(1).text(p - 1);
        btn(2).text(p);
        btn(3).text(p + 1);
        btn(4).text(p + 2);

        this.runSkinsFetch(this.tab, null, this.page);
    }

    updatePageForward() {
        const btn = i => $("#skinsPagin .pagination-" + i);

        if (this.pageData) {
            if (this.pageData.length < 8) {
                btn(3).addClass('disabled');
                btn(4).addClass('disabled');
            } else {
                btn(3).removeClass('disabled');
                btn(4).removeClass('disabled');
            }
        }
    }

    setupPaginatorBtns() {
        const btn = (i) => $("#skinsPagin .pagination-" + i);
        btn(0).click(() => { this.setPage(1, true) })
        btn(1).click(() => { this.setPage(this.page - 1, false) })
        btn(3).click(() => { this.setPage(this.page + 1, false) })
        btn(4).click(() => { this.setPage(this.page + 2, false) })
    }

    initialise() {
        this.setSubmitPageState(1);
        $("#skin-modal").click(() => this.hide())
        $("#skin-modal .content").click(e => e.stopPropagation())
        $("#skin-modal .exit-button").click(() => this.hide())

        $("#skinBtn1").click(() => this.loadTab(1));
        $("#skinBtn2").click(() => this.loadTab(2));
        $("#skinBtn3").click(() => this.loadTab(3));
        $("#skinBtn4").click(() => this.loadTab(4));
        $("#skinBtn5").click(() => this.loadSubmitPage());

        $(document).on('change', '#imageUploadFile', e => this.doUpload(e));

        $("#imageUploadFileBtn").click(e => $('#imageUploadFile').click());

        $("#submitStartOver").click(e => this.setSubmitPageState(1));

        this.skinItemTemplate = $('template[name="skin-item"]')[0];
        this.submitTemplate = $('template[name="skin-submit"]')[0];

        $("input").keyup(e => {
            const ENTER_KEY_CODE = 13;
            if (e.keyCode == ENTER_KEY_CODE) {
                if (e.target.id === "skinSearch") {
                    const query = $("#skinSearch").val();
                    this.runSkinsFetch(this.tab, query, 0);
                }
            }
        });

        $("#skinSearch").on("change paste keyup", e => {
            if (this.prevSearchVal != e.target.value) {
                this.prevSearchVal = e.target.value;
                if (this.prevSearchVal === "") {
                    this.runSkinsFetch(this.tab, null, 0);
                }
            }
        });

        new PerfectScrollbar('#skinView', {
            wheelPropagation: false
        });

        this.setupPaginatorBtns();
    }

    loadSubmitPage() {
        this.setActiveTab(this.tabs.TAB_SUBMITSKIN);
        $("#skin-submit").show();
        $("#skinSearch").hide();
        $("#skinView").hide();
        $("#skinsPagin").hide();

    }

    setActiveTab(t) {
        this.tab = t;
        for (let i = 0; i < 10; i++) {
            $("#skinBtn" + i).prop("disabled", false);
        }
        $("#skinBtn" + this.tab).prop("disabled", true);
        $("#skinSearch").val("");
    }

    loadTab(index) {
        if (this.tab === index) return;

        this.setActiveTab(index);

        $("#skinSearch").show();
        $("#skin-submit").hide();
        $("#skinView").show();
        $("#skinsPagin").show();
        $("#skinGrid").html('');

        if (index === this.tabs.TAB_LEVELS) {
            $("#skinSearch").hide();
            $("#skinsPagin").hide();
        }

        this.setPage(1, true);
    }

    setPageResults(data) {
        this.pageData = data;

        if (data == null) {
            $("#skinGrid").hide();
            $("#skinsLoading").show();

            // this will kill the in-progress http requests of images
            this.nodeImgs.map(img => {
                $(img).attr("src", "");
            })
            this.nodeImgs = [];
            this.nodeItems = [];
            this.nodeBtns = [];
            this.xIcons = [];
            //return here
            this.currentlyDisplayedSkins = [];
        } else {
            $("#skinGrid").show();
            $("#skinsLoading").hide();
            $("#skinGrid").html('');
            this.pageData = this.pageData.sort((a, b) => parseInt(a.requirementData) - parseInt(b.requirementData));

            this.pageData.map(skin => this.spawnNewSkinGridItem(<SkinData>skin))

            this.updateFavoritedSkinsDisplay();
            this.updateSelectedSkinDisplay();
            this.updatePageForward();
        }
    }

    validateSkinRequirements(skin): string {
        const lockIcon = '<i class="fas fa-lock"></i>';
        if (skin.skinName === "Pending") return `${lockIcon} Pending`;

        if (skin.requirementType == null || skin.requirementType == 0) return '';

        if (skin.requirementType == 1) {
            let { experience = 0 } = AccountData.profile;
            const level = Experience.levelFromExp(experience);

            if (level < parseInt(skin.requirementData)) {
                return `${lockIcon} Level ${skin.requirementData}`;
            }
            return '';
        }

        return 'aaaaaaaaaaaa';
    }

    updateSelectedSkinDisplay() {
        //updater
        this.nodeImgs.map((img) => {
            let i = this.nodeImgs.indexOf(img);
            const skin = $(img).attr("src");
            let gridItem = this.nodeItems[i];
            let btn = this.nodeBtns[i];
            let icon = this.xIcons[i];
            if (this.getSelectedSkinURL() == skin) {
                $(gridItem).addClass("selected");
                $(btn).addClass("selected");
                $(img).addClass("");
                $(icon).addClass('selected');
            } else {
                $(gridItem).removeClass("selected");
                $(btn).removeClass("selected");
            }

        })
    }

    updateFavoritedSkinsDisplay() {
        this.currentlyDisplayedSkins.map((skin) => {
            const node = this.getSkinIconByIdSkinId(skin.id);

            if (AccountData.profile.favorites != null && AccountData.profile.favorites.indexOf(skin.id) != -1) {
                $(node).addClass("selected");
                if (this.tab !== this.tabs.TAB_FAVORITES) {
                    $(node).children().removeClass("far");
                    $(node).children().removeClass("fa-bookmark");
                    $(node).children().addClass("fas");
                    $(node).children().addClass("fa-bookmark");
                }

            } else {
                $(node).removeClass("selected");
                if (!$(node).children().hasClass("far") && this.tab !== this.tabs.TAB_FAVORITES) {
                    $(node).children().removeClass("fas");
                    $(node).children().removeClass("fa-bookmark");
                    $(node).children().addClass("far");
                    $(node).children().addClass("fa-bookmark");
                }
            }
        })

        //onSkinUpdate
    }

    getSkinIconByIdSkinId(skinId) {
        return $("#skinView").find(`[data-fav-skin-id="${skinId}"]`);

    }

    typeIntToString(inputType: number): string {
        let type = "";

        switch (inputType) {
            case 1: type = "level"; break;
            case 2: type = "free"; break;
            case 3: type = "mine"; break;
            case 4: type = "favorites"; break;
        }

        return type;
    }

    rebuildPageResults() {
        this.setPageResults(this.pageData);

    }

    async runSkinsFetch(type: number, query: string | null, page) {
        const typeStr = this.typeIntToString(type)

        // offset by -1; page 0 will always display random skins
        if (this.tab === this.tabs.TAB_FREE) page -= 1;
        this.setPageResults(null);

        const url = query == null || query.length < 1 ? this.config.listUrl : this.config.searchUrl;
        const auth = AccountData.authToken;

        const headers = { auth, type: typeStr, query, page };

        if (query == null || query.length < 1) delete headers.query;
        if (page == null) delete headers.page;

        const data = await fetch(url, {
            method: 'GET',
            headers
        });

        const json = await data.json();

        if (json.results && !json.error) {
            this.setPageResults(json.results);
            console.log(json.results);
        } else {
            console.log("error", json);
        }
    }

    setSubmitPageState(index) {
        for (let i = 1; i <= 5; i++) {
            $(`#submit-form-state${i}`).hide();

        }
        $(`#submit-form-state${index}`).show();
    }

    hide() {
        $("#skin-modal").removeClass("visible");
        this.open = false;
    }

    show() {
        if (AccountData.loginStatus === true && (AccountData.profile != null && AccountData.authToken != null)) {
            $("#skin-modal").addClass("visible");
            this.open = true;

            if (this.tab == 0) {
                this.loadTab(1);
            } else {
                this.rebuildPageResults();
            }

        } else {
            alert("You must be logged in to use this feature!")
        }
    }

    doUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        this.setSubmitPageState(2);

        const doFallbackToApiUpload = () => {
            var fd = new FormData();
            fd.append("imageFile", file);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", this.config.fallbackUploadUrl);
            xhr.onload = () => {
                const link = JSON.parse(xhr.responseText).link;
                console.log('returned file link', link);
                sendUploadedLink(link);
            }
            xhr.onerror = (e) => {
                console.log(e);
                this.setSubmitPageState(5);
            }

            xhr.setRequestHeader('auth', AccountData.authToken);
            xhr.send(fd);
        }

        const sendUploadedLink = async link => {
            const data = await fetch(this.config.submitUrl, {
                headers: {
                    auth: AccountData.authToken,
                    image: link,
                },
                method: 'POST'
            });

            const json = await data.json();

            if (json.success && !json.error) {
                this.setSubmitPageState(3);
            } else if (json.error && json.error.indexOf("pending") != -1) {
                this.setSubmitPageState(4);
            } else {
                console.log("error", json);
                this.setSubmitPageState(5);
            }
        }

        var fd = new FormData();
        fd.append("image", file);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/image.json");
        xhr.onload = () => {
            const link = JSON.parse(xhr.responseText).data.link;
            console.log('returned file link', link);
            sendUploadedLink(link);
        }
        xhr.onerror = (e) => {
            doFallbackToApiUpload();
            // console.log(e);
            // this.setSubmitPageState(5);
        }

        xhr.setRequestHeader('Authorization', 'Client-ID 107f588b7a9862d');
        xhr.send(fd);
    }

    spawnNewSkinGridItem(skin: SkinData) {
        const skinUrl = !skin.skinRoute.includes("http") ? this.config.skinBase + skin.skinRoute : skin.skinRoute;

        const cleanedName = skin.skinName
            .replace(/-/g, " ") // replace hyphens with spaces
            .replace(/[0-9]+/, ""); // remove numbers

        const el = (<HTMLTemplateElement>this.skinItemTemplate.cloneNode(true)).content;
        const bntEl = el.querySelector("button");
        const imgEl = el.querySelector("img");

        $(imgEl).attr("src", skinUrl);

        this.nodeImgs.push(imgEl);
        this.nodeItems.push($(imgEl).parent());
        this.nodeBtns.push(bntEl);

        $(el.querySelector(".title")).text(cleanedName);

        const icon = el.querySelector(".icon");

        $(icon).attr("data-fav-skin-id", skin.id);

        $(icon)[0].addEventListener('touchend', () => {
            const currentIndex = AccountData.profile.favorites.indexOf(skin.id);
            if (currentIndex != -1) {
                AccountData.profile.favorites.splice(currentIndex, 1);
                this.sendFavorite(skin.id, 'DELETE');
            } else {
                AccountData.profile.favorites.push(skin.id);
                this.sendFavorite(skin.id, 'POST');
            }
            //$(icon).hide();
            this.updateFavoritedSkinsDisplay();
        });

        if (this.tab === this.tabs.TAB_FAVORITES) {
            icon.innerHTML = (`<i class="fas fa-times fa-2x"></i>`);
            $(icon).addClass("delete-icon");
        }

        this.xIcons.push($(icon).children());

        const requirementMetMsg = this.validateSkinRequirements(skin);

        console.log(requirementMetMsg);

        if (requirementMetMsg === '') {
            if (this.getSelectedSkinURL() == skinUrl) {
                $(el.querySelector("button")).text("Remove");
                $(el.querySelector("button")).addClass('selected');
                $(el.querySelector("button")).parent().addClass('selected');
                $(el.querySelector(".icon")).children().addClass('selected');
                $(el.querySelector("button")).addClass("delete");
                $(el.querySelector("button")).on("touchend", () => {
                    const el = this.getSelectedSkinInputEl();
                    el.val('');
                    $(el).removeClass("has-image");
                    el.change();

                    this.onSkinUpdate(this.selectedSkinUnit, 'no-skin');

                    this.rebuildPageResults();
                    this.hide();
                })
            } else {
                $(el.querySelector("button")).on("touchend", () => {
                    const el = this.getSelectedSkinInputEl();
                    el.val(skinUrl);
                    $(el).addClass("has-image");
                    el.change();
                    console.log('Changed skin');
                    this.onSkinUpdate(this.selectedSkinUnit, skinUrl);

                    this.rebuildPageResults();
                    this.hide();
                })
            }

        } else {
            $(el.querySelector("button")).prop("disabled", "true");
            $(el.querySelector("button")).html(requirementMetMsg);
        }

        this.currentlyDisplayedSkins.push(skin)
        $("#skinGrid").append(el);
    }

    async sendFavorite(skinId, method) {
        const data = await fetch(this.config.favoriteUrl + "/" + skinId, {
            headers: {
                auth: AccountData.authToken,
            },
            method
        });

        const json = await data.json();

        if (json.results && !json.error) {
            if (this.tab === this.tabs.TAB_FAVORITES) this.setPage(this.page, true);
            const icon = this.getSkinIconByIdSkinId(skinId);
            if (icon) $(icon).show();
            console.log(icon);
        } else {
            console.log("error", json);
        }
    }
}

export default new SkinModal();