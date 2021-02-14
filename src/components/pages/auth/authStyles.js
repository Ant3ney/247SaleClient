import GlobalConstants from '../../../utilities/GlobalConstants';

let authStyles =  {
    authPageContainerStyle: (size, marginX, variant) => {
        let backgroundColor;
        let padding;
        let paddingTop;
        let height;
        let paddingBottom;
        
        if(variant === 'authPage'){
            backgroundColor = '#278D8A';
        }
        else{
            backgroundColor = '#112123';
        }

        if(size === 'extrasmall'){
            padding = '1rem';
            paddingTop = '6.5vh';
            height = '100vh';
        }
        else if(size === 'wide'){
            padding = '15%';
            height = 'auto';
            if(variant === 'authPage'){
                paddingTop = '8vh';
            }
            else{
                paddingTop = '2rem';
                paddingBottom = '2rem';
            }
        }
        else{
            padding = (marginX * 3) + 'rem';
            paddingTop = 'unset';
            height = '100vh';
        }

        return({
            width: '100%',
            height: height,
            backgroundColor: backgroundColor,
            paddingLeft: padding,
            paddingRight: padding,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: paddingTop,
            paddingBottom: paddingBottom
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
        let fontSize;
        if(variant === 'authPage'){
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
        let fontSize;
        if(variant === 'authPage'){
            textShadow = GlobalConstants.shadowSettings
        }
        else{
            textShadow = 'unset'
        }

        if(size === 'extrasmall'){
            fontSize = '2.25em';
        }
        else if(size === 'wide'){
            fontSize = '2em';
        }
        else{
            fontSize = '3.5em';
        }

        return({
            color: 'white',
            fontFamily: 'SHOWG',
            marginBottom: 0,
            fontSize: fontSize,
            textShadow: textShadow
        })
    },
    authSubTitle: (size, variant) => {
        let textShadow;
        let marginTop;
        if(variant === 'authPage'){
            textShadow = GlobalConstants.shadowSettings
        }
        else{
            textShadow = 'unset'
        }

        if(size === 'wide'){
            marginTop = '0.5em';
        }
        else{
            marginTop = '1em';
        }

        return({
            color: 'white',
            textShadow: textShadow,
            marginBottom: 0,
            marginTop: marginTop
        });
    },
    authFormContainer: (size, variant) => {
        let backgroundColor;
        let padding;
        let borderRadius;
        let marginTop;
        let marginBottom;
        if(variant === 'authPage'){
            backgroundColor = '#112123';
            borderRadius = GlobalConstants.thumbnailBorderRadius;
            if(size === 'wide'){
                padding = '1.5em';
                marginBottom = '1.5em';
            }
            else{
                padding = '2em';
                marginBottom = 0;
            }
        }
        else{
            backgroundColor = 'unset'
            padding = 0;
            borderRadius = 0;
            marginBottom = 0;
        }

        if(size === 'wide'){
            marginTop = '0.5em';
        }
        else{
            marginTop = '1em';
        }

        return({
            backgroundColor: backgroundColor,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: padding,
            borderRadius: borderRadius,
            marginTop: marginTop,
            marginBottom: marginBottom
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
        if(variant === 'authPage'){
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
        let width;
        if(variant === 'authPage'){
            backgroundColor =  '#278D8A'
        }
        else{
            backgroundColor = '#278D8A'
        }

        if(size === 'extrasmall'){
            width = '40%';
        }
        else{
            width = '20%';
        }

        return({
            backgroundColor: backgroundColor,
            width: width,
            outline: 'none',
            color: 'white',
            border: 0,
            borderRadius: GlobalConstants.buttonBorderRadius,
            marginTop: '1em'
        });
    }
}

export default authStyles;