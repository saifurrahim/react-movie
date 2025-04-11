import { createRoot } from 'react-dom/client'
import { MovieContainer } from './MovieApp'
import NowPlaying from './NowPlaying'
import TopRated from './TopRated'

createRoot(document.getElementById('root')!).render(
    <MovieContainer>
      <div className='flex flex-col'>
      <NowPlaying />
      <TopRated/>
      <div className='bg-blue-300'></div>
      </div>
    </MovieContainer>,
)
