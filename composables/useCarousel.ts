export function useCarousel() {
  const carousel = ref<HTMLElement | null>(null);
  const currentSlide = ref(0);
  let dragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  const slideLeft = (slide: HTMLElement) => {
    const element = carousel.value;
    if (!element) return 0;
    return Math.min(slide.offsetLeft - element.offsetLeft, element.scrollWidth - element.clientWidth);
  };

  const updateCurrentSlide = () => {
    const element = carousel.value;
    if (!element) return;

    const slides = Array.from(element.children) as HTMLElement[];
    currentSlide.value = slides.reduce((closest, slide, index) =>
      Math.abs(slideLeft(slide) - element.scrollLeft) < Math.abs(slideLeft(slides[closest]) - element.scrollLeft)
        ? index
        : closest, 0);
  };

  const goToSlide = (index: number) => {
    const element = carousel.value;
    const slide = element?.children[index] as HTMLElement | undefined;
    if (!element || !slide) return;

    currentSlide.value = index;
    element.scrollTo({ left: slideLeft(slide), behavior: 'smooth' });
  };

  const startDrag = (event: PointerEvent) => {
    const element = carousel.value;
    if (!element || event.pointerType !== 'mouse' || event.button !== 0) return;
    dragging = true;
    startX = event.clientX;
    startScrollLeft = element.scrollLeft;
    element.setPointerCapture(event.pointerId);
  };

  const drag = (event: PointerEvent) => {
    if (!dragging || !carousel.value) return;
    event.preventDefault();
    carousel.value.scrollLeft = startScrollLeft - (event.clientX - startX);
  };

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    updateCurrentSlide();
  };

  return { carousel, currentSlide, updateCurrentSlide, goToSlide, startDrag, drag, endDrag };
}
