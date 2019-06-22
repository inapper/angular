const htmlExample = {
  script: '(function(){'+
'                const steps = document.querySelectorAll(\'.step\');'+
'                const stepWrapper = document.querySelector(\'.steps\');'+
'                const stepBullet = document.querySelector(\'.step__bullet\');'+
'                const stepBulletDot = document.querySelectorAll(\'.step__bullet-dot\');'+
'                const eventsTouchListener = [\'touchstart\', \'touchend\', \'mousedown\', \'mouseup\'];'+
'                let startAxis = 0;'+
'    '+
'                const getActiveStepIndex = () => {'+
'                    let activeIndex;'+
'                    '+
'                    steps.forEach((step, index) => {'+
'                        if (step.classList.contains(\'is-active\'))'+
'                          activeIndex = index'+
'                    })'+
'    '+
'                    return activeIndex'+
'                }'+
'    '+
'                const isFirstStepIndex = () => getActiveStepIndex(steps) === 0'+
'                '+
'                const isLastStepIndex = () => getActiveStepIndex(steps) === (steps.length - 1)'+
'    '+
'                const isNavToNext = (event) => new Promise ((resolve, reject) => {'+
'                    switch (event.type) {'+
'                        case \'mousedown\' :'+
'                            startAxis = event.x;'+
'                        break;'+
'                        case \'touchstart\' :'+
'                            startAxis = event.changedTouches[0].clientX;'+
'                        break;'+
'                        case \'mouseup\' :'+
'                            resolve(startAxis > event.x)'+
'                        break;'+
'                        case \'touchend\' :'+
'                            resolve(startAxis > event.changedTouches[0].clientX)'+
'                        break;'+
'                    }'+
'                })'+
'    '+
'                const toggleBulletHighlighted = () => {'+
'                    const activeStepIndex = getActiveStepIndex();'+
'                    const isStepHighlighted = steps[activeStepIndex].classList.contains(\'is-highlighted\');'+
'    '+
'                    stepBullet.classList.toggle(\'is-highlighted\', isStepHighlighted)'+
'                }'+
'    '+
'                const toggleBulletOnTop = () => {'+
'                    stepBullet.classList.toggle(\'on-top\', isLastStepIndex())'+
'                }'+
'    '+
'                const setActiveStep = (navToNext, currentStepIndex, nextStepIndex) => {'+
'                    stepWrapper.classList.toggle(\'is-back\', !navToNext)'+
'                    '+
'                    steps.forEach(step => step.classList.remove(\'is-exceeded\'))'+
'                    '+
'                    steps[currentStepIndex].classList.remove(\'is-active\')'+
'                    stepBulletDot[currentStepIndex].classList.remove(\'is-active\')'+
'                    '+
'                    steps[currentStepIndex].classList.add(\'is-exceeded\')'+
'    '+
'                    steps[nextStepIndex].classList.add(\'is-active\')'+
'                    stepBulletDot[nextStepIndex].classList.add(\'is-active\')'+
'    '+
'                    toggleBulletHighlighted()'+
'                    toggleBulletOnTop()'+
'                }'+
'    '+
'                const stepNavTo = (navToNext) => {'+
'                    const activeStepIndex = getActiveStepIndex();'+
'    '+
'                    if (isFirstStepIndex() && !navToNext)'+
'                        return;'+
'    '+
'                    if (isLastStepIndex() && navToNext)'+
'                        return;'+
'                    '+
'                    if (navToNext) {'+
'                        setActiveStep(navToNext, activeStepIndex, activeStepIndex + 1);'+
'                        return;'+
'                    }'+
'                    '+
'                    if(!isLastStepIndex()){'+
'                        setActiveStep(navToNext, activeStepIndex, activeStepIndex - 1);'+
'                    }'+
'                }'+
'    '+
'                const stepNavigation = async (event) => {'+
'                    const navToNext = await isNavToNext(event);'+
'                    '+
'                    stepNavTo(navToNext)'+
'                }'+
'    '+
'                eventsTouchListener.map( event => stepWrapper.addEventListener(event, eventElement => stepNavigation(eventElement)) )'+
'            })();',
  style: '        * {\r\n            box-sizing: border-box;\r\n            margin: 0;\r\n            padding: 0; \r\n        }\r\n\r\n        :root {\r\n            font-size: 16px;\r\n        }\r\n\r\n        html, \r\n        body {\r\n            height: 100%;\r\n        }\r\n\r\n        body {\r\n            font-family: \'Roboto\', Arial, Helvetica;\r\n        }\r\n\r\n        .inapp {\r\n            position: relative;\r\n            height: 100%;\r\n            overflow: hidden;\r\n        }\r\n\r\n        .inapp__close {\r\n            position: fixed;\r\n            top: 25px;\r\n            right: 25px;\r\n            display: inline-block;\r\n            width: 30px;\r\n            height: 30px;\r\n            background-image: url(\'https:\/\/www.itau.com.br\/_arquivosestaticos\/Itaumail\/campanhas\/app_full_evolucao\/educacao-financeira\/emkt-01\/sprite.png\');\r\n            background-position: -25px;\r\n            background-repeat: no-repeat;\r\n            z-index: 10;\r\n        }\r\n\r\n        .step {\r\n            position: absolute;\r\n            left: 0;\r\n            top: 0;\r\n            padding: 25px;\r\n            width: 100%;\r\n            height: 100%;\r\n            display: flex;\r\n            flex-direction: column;\r\n            justify-content: center;\r\n            background: #ffffff;\r\n            color: #58595b;\r\n            transform: translateX(100%);\r\n            opacity: 0;\r\n            transition: 0.4s cubic-bezier(0.12, 1.1, 0.74, 0.99);\r\n            -webkit-user-select: none;\r\n            -moz-user-select: none;\r\n            -ms-user-select: none;\r\n            user-select: none;\r\n        }\r\n\r\n        .step.is-highlighted {\r\n            background: #ff6400;\r\n            color: #FFFFFF;\r\n        }\r\n        \r\n        .step.is-highlighted .step__title {\r\n            color: #FFFFFF;\r\n            font-weight: 500;\r\n            font-size: 1.4em;\r\n        }\r\n\r\n        .step.is-highlighted .step__title span {\r\n            display: flex;\r\n            align-items: center;\r\n            padding: 5px 15px;\r\n            height: 50px;\r\n            white-space: nowrap;\r\n            border: 3px solid #fe8c1a;\r\n            border-radius: 10px;\r\n            line-height: 1;\r\n        }\r\n\r\n        .step.is-highlighted span.step__title--icon {\r\n            padding: 5px;\r\n            content: url(\'https:\/\/www.itau.com.br\/_arquivosestaticos\/Itaumail\/campanhas\/app_full_evolucao\/educacao-financeira\/emkt-01\/icon-search.jpg\');\r\n        }\r\n\r\n        .step.is-highlighted .step__title span:nth-child(1) { max-width: 290px; }\r\n        .step.is-highlighted .step__title span:nth-child(2) { max-width: 230px; }\r\n        .step.is-highlighted .step__title span:nth-child(3) { margin-left: 180px; }\r\n\r\n        .step.is-highlighted .step__title span:not(:last-child) {\r\n            margin-bottom: 5px;\r\n        }\r\n        \r\n        .step.is-exceeded {\r\n            transform: translateX(-100%);\r\n        }\r\n\r\n        .step.is-active {\r\n            transform: translateX(0);\r\n            opacity: 1;\r\n        }\r\n\r\n        .steps.is-back .step:not(.is-active) {\r\n            transform: translateX(-100%);\r\n            opacity: 0;\r\n        }\r\n\r\n        .steps.is-back .step.is-exceeded {\r\n            transform: translateX(100%);\r\n        }\r\n\r\n        .step__container {\r\n            width: 100%;\r\n        }\r\n\r\n        .step__title {\r\n            color: #ff6400;\r\n            font-size: 1.875em;\r\n            font-weight: 500;\r\n        }\r\n\r\n        .step__description {\r\n            font-size: 1.125em;\r\n            max-width: 300px;\r\n            margin: 50px 0;\r\n        }\r\n\r\n        .step__bullet {\r\n            position: fixed;\r\n            bottom: 15px;\r\n            left: 50%;\r\n            z-index: 9;\r\n            transform: translateX(-50%);\r\n            display: flex;\r\n        }\r\n\r\n        .step__bullet-dot {\r\n            display: inline-block;\r\n            width: 10px;\r\n            height: 10px;\r\n            border-radius: 100%;\r\n            margin: 0 5px;\r\n            background-color: #ff6400;\r\n        }\r\n\r\n        .step__bullet-dot:not(.is-active) {\r\n            opacity: .5;\r\n        }\r\n\r\n        .step__bullet.is-highlighted .step__bullet-dot {\r\n            background-color: #ffffff;\r\n        }\r\n\r\n        .step__bullet.on-top {\r\n            bottom: 100px;\r\n        }\r\n\r\n        .step__cta {\r\n            display: block;\r\n            position: absolute;\r\n            bottom: 15px;\r\n            left: 25px;\r\n            right: 25px;\r\n            background-color: #ff6400;\r\n            color: #ffffff;\r\n            text-align: center;\r\n            text-decoration: none;\r\n            border-radius: 10px;\r\n            padding: 25px;\r\n            transition: .2s;\r\n        }\r\n\r\n        .step__cta:hover {\r\n            background-color: #b64e09;\r\n        }\r\n\r\n        @media (max-width: 768px) and (orientation: landscape) {\r\n            .step__title {\r\n                padding-right: 30px;\r\n            }\r\n\r\n            .step__description-wrap {\r\n                display: flex;\r\n                flex-direction: row-reverse;\r\n                align-items: center;\r\n                padding-right: 40px;\r\n                margin: 20px 0 60px;\r\n            }\r\n\r\n            .step__description {\r\n                max-width: none;\r\n                margin: 0;\r\n            }\r\n\r\n            .step__description-wrap .step__description {\r\n                padding: 0 20px;\r\n            }\r\n        }'
};
	
export default htmlExample;