export default function GetFreshDeals(setFreshDeals, serverOrigin){
    return new Promise((resolve, reject) => {
        fetch(`${serverOrigin}/deals/fresh`, {
        method: 'get'
        })
        .then((res) => {
            return res.json();
        })
        .then((freshDeals) => {
            if (freshDeals.failed) {
                return Promise.reject(freshDeals);
            }
            setFreshDeals(freshDeals.deals);
            resolve(freshDeals.deals);
        })
        .catch(err => {
            console.error('error happeoned in get fresh deals fetch because ' + err.message);
            reject(err);
        });
    });
};
