import React, { useCallback } from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { getFilePreview } from "../../services/appwrite/postServices"
import parse from "html-react-parser";
import { Link } from 'react-router-dom'

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  )

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <Link to={`/post/${slide.slug}`} className="embla__slide" key={index}>
              <img className="embla__slide__img" src={getFilePreview(slide.featuredImage)} alt={`Slide ${index+1}`} />
              <div className='flex gap-4 justify-between items-center px-2'>
                <div className='max-w-3/4'>
                  <h1 className="text-3xl font-semibold mt-4 truncate line-clamp-1">{slide.title}</h1>
                  <p className='trunacate line-clamp-1 text-xl mt-2 text-slate-300'>{parse(slide.content)}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='bg-slate-900 flex items-center p-3 rounded-full border border-slate-700'>
                    <i className="fa-solid fa-user text-slate-500"></i>
                  </div>
                  <p className='text-slate-400 text-base truncate max-w-16'>{slide.username}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
