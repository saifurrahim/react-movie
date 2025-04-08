import { createRoot } from 'react-dom/client'
import { MovieContainer } from './MovieApp'
import NowPlaying from './NowPlaying'

createRoot(document.getElementById('root')!).render(
    <MovieContainer>
      <div className='grid grid-rows-3'>
      <NowPlaying />
      <div className='bg-red-300'></div>
      <div className='bg-blue-300'></div>
      </div>
    </MovieContainer>,
)
