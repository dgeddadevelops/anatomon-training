/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import './CardFlip.css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PokeCardFront from './PokeCardFront';
import PokeCardBack from './PokeCardBack';

const CardFlip = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }

  const { pokeName, pokeImage, type, name, ...rest } = props;
  const frontProps = { pokeName, pokeImage, type, name }
  const backProps = { pokeName, pokeImage, name, rest }


  return (
    <div onClick={handleFlip} className="flip-card">
      <motion.div
        className="flip-card-inner"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 360 }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <div className="flip-card-front rounded-lg">
          <PokeCardFront {...frontProps} />
        </div>
        <div className="flip-card-back rounded-lg">
          <PokeCardBack {...backProps} />
        </div>
      </motion.div>
    </div>
  );
};

export default CardFlip;
