
const intSlider = () => {

    const imageList = document.querySelector('.slider-wapper .image-list')
    const sliderButton = document.querySelectorAll('.slider-wapper button');
    const sliderScrollbar = document.querySelector('.container .slider-scrolbar');
    const scrollThumb = document.querySelector('.container .scrollbar-thumb');

    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    scrollThumb.addEventListener('mousedown', e => {

        const startX = e.clientX;
        const thumbPosition = scrollThumb.offsetLeft;

        const handleMouseMove = e => {

            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollThumb.offsetWidth;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollThumb.style.left = ` ${boundedPosition}px `;
            imageList.scrollLeft = scrollPosition;
        };

        const handleMouseUp = () => {

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    });

    sliderButton.forEach(button => {

        button.addEventListener('click', () => {

            const direction = button.id === 'prev' ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    });

    const handelSlideButton = () => {

        sliderButton[0].style.display = imageList.scrollLeft <= 0 ? 'none' : 'block';
        sliderButton[1].style.display = imageList.scrollLeft >= maxScrollLeft ? 'none' : 'block';
    };

    const updateScrollThumbPosition = () => {

        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollThumb.offsetWidth);
        scrollThumb.style.left = ` ${thumbPosition}px `;
    };

    imageList.addEventListener('scroll', () => {

        handelSlideButton()
        updateScrollThumbPosition();
    });
};

window.addEventListener('load', intSlider);