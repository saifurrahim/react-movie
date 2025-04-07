import { createRoot } from 'react-dom/client'
import { MovieContainer } from './MovieApp'
import NowPlaying from './NowPlaying'

createRoot(document.getElementById('root')!).render(
    <MovieContainer>
      <NowPlaying />
    </MovieContainer>,
)
