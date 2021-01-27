import GlobalConstants from '../../../utilities/GlobalConstants';

export default {
    authPageContainerStyle: (size, marginX, variant) => {
        let backgroundColor;
        if(variant == 'authPage'){
            backgroundColor = '#278D8A';
        }
        else{
            backgroundColor = '#112123'
        }

        return({
            width: '100%',
            height: '100vh',
            backgroundColor: backgroundColor,
            paddingLeft: (marginX * 3) + 'em',
            paddingRight: (marginX * 3) + 'em',
            display: 'flex',
            flexDirection: 'column'     
        });
    },
    authContentContainer: (size) => {

        return({
            width: '100%',
            height: 'fit-content',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column'
        })
    },
    authTitleContainer: (size, variant) => {
        let paddingLeft;
        let paddingRight;
        if(variant == 'authPage'){
            paddingLeft = '2rem';
            paddingRight = '2rem';
        }
        else{
            paddingLeft = '0rem';
            paddingRight = '0rem';
        }

        return({
            width: '100%',
            height: 'fit-content',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: paddingLeft,
            paddingRight: paddingRight
        })
    },
    authTitle: (size, variant) => {
        let textShadow;
        if(variant == 'authPage'){
            textShadow = GlobalConstants.shadowSettings
        }
        else{
            textShadow = 'unset'
        }

        return({
            color: 'white',
            fontFamily: 'SHOWG',
            marginBottom: 0,
            fontSize: '3.5em',
            textShadow: GlobalConstants.shadowSettings
        })
    },
    authSubTitle: (size, variant) => {
        let textShadow;
        if(variant == 'authPage'){
            textShadow = GlobalConstants.shadowSettings
        }
        else{
            textShadow = 'unset'
        }

        return({
            color: 'white',
            textShadow: textShadow,
            marginBottom: 0,
            marginTop: '1em'
        });
    },
    authFormContainer: (size, variant) => {
        let backgroundColor;
        let padding;
        let borderRadius;
        if(variant == 'authPage'){
            backgroundColor = '#112123';
            padding = '2em';
            borderRadius = GlobalConstants.thumbnailBorderRadius;
        }
        else{
            backgroundColor = 'unset'
            padding = 0;
            borderRadius = 0;
        }

        return({
            backgroundColor: backgroundColor,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: padding,
            borderRadius: borderRadius,
            marginTop: '1em'
        })
    },
    authFormLabel: size => {
        
        return({
            color: 'white',
            fontSize: '1em',
            height: '0.8em',
            lineHeight: '0.8em'
        });
    },
    authInput: (size, variant) => {
        let backgroundColor;
        if(variant == 'authPage'){
            backgroundColor =  '#278D8A'
        }
        else{
            backgroundColor = '#278D8A'
        }

        return({
            outline: 'none',
            border: 0,
            color: 'white',
            backgroundColor: backgroundColor,
            paddingLeft: '0.5em',
            paddingRight: '0.5em',
            borderRadius: '5px',
            marginTop: '0.5em'
        });
    },
    authButtons: (size, variant) => {
        let backgroundColor;
        if(variant == 'authPage'){
            backgroundColor =  '#278D8A'
        }
        else{
            backgroundColor = '#278D8A'
        }

        return({
            backgroundColor: backgroundColor,
            width: '20%',
            outline: 'none',
            color: 'white',
            border: 0,
            borderRadius: GlobalConstants.buttonBorderRadius,
            marginTop: '1em'
        });
    }
}