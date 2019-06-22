(function(){
    const steps = document.querySelectorAll('.step');
    const stepWrapper = document.querySelector('.steps');
    const stepBullet = document.querySelector('.step__bullet');
    const stepBulletDot = document.querySelectorAll('.step__bullet-dot');
    const eventsTouchListener = ['touchstart', 'touchend', 'mousedown', 'mouseup'];
    let startAxis = 0;

    const getActiveStepIndex = () => {
        let activeIndex;
        
        steps.forEach((step, index) => {
            if (step.classList.contains('is-active'))
              activeIndex = index
        })

        return activeIndex
    }

    const isFirstStepIndex = () => getActiveStepIndex(steps) === 0
    
    const isLastStepIndex = () => getActiveStepIndex(steps) === (steps.length - 1)

    const isNavToNext = (event) => new Promise ((resolve, reject) => {
        switch (event.type) {
            case 'mousedown' :
                startAxis = event.x;
            break;
            case 'touchstart' :
                startAxis = event.changedTouches[0].clientX;
            break;
            case 'mouseup' :
                resolve(startAxis > event.x)
            break;
            case 'touchend' :
                resolve(startAxis > event.changedTouches[0].clientX)
            break;
        }
    })

    const toggleBulletHighlighted = () => {
        const activeStepIndex = getActiveStepIndex();
        const isStepHighlighted = steps[activeStepIndex].classList.contains('is-highlighted');

        stepBullet.classList.toggle('is-highlighted', isStepHighlighted)
    }

    const toggleBulletOnTop = () => {
        stepBullet.classList.toggle('on-top', isLastStepIndex())
    }

    const setActiveStep = (navToNext, currentStepIndex, nextStepIndex) => {
        stepWrapper.classList.toggle('is-back', !navToNext)
        
        steps.forEach(step => step.classList.remove('is-exceeded'))
        
        steps[currentStepIndex].classList.remove('is-active')
        stepBulletDot[currentStepIndex].classList.remove('is-active')
        
        steps[currentStepIndex].classList.add('is-exceeded')

        steps[nextStepIndex].classList.add('is-active')
        stepBulletDot[nextStepIndex].classList.add('is-active')

        toggleBulletHighlighted()
        toggleBulletOnTop()
    }

    const stepNavTo = (navToNext) => {
        const activeStepIndex = getActiveStepIndex();

        if (isFirstStepIndex() && !navToNext)
            return;

        if (isLastStepIndex() && navToNext)
            return;
        
        if (navToNext) {
            setActiveStep(navToNext, activeStepIndex, activeStepIndex + 1);
            return;
        }
        
        if(!isLastStepIndex()){
            setActiveStep(navToNext, activeStepIndex, activeStepIndex - 1);
        }
    }

    const stepNavigation = async (event) => {
        const navToNext = await isNavToNext(event);
        
        stepNavTo(navToNext)
    }

    eventsTouchListener.map( event => stepWrapper.addEventListener(event, eventElement => stepNavigation(eventElement)) )
})();