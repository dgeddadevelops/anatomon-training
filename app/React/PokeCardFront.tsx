import { motion } from "framer-motion";
import { useContext } from "react";

import type { Pokemon } from "~/poke-data/pokemon";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/shadcn/components/ui/card";

import { imageVariants, textVariants } from "./poke-variants";
import { StudyToggleContext } from "./StudyToggleContext";

const PokeCardFront = (props: Pokemon) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [studyMode]: any = useContext(StudyToggleContext);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { pokeName, pokeImage, type, name } = props;

  return (
    <Card
      style={{ width: "100%", minWidth: "150px", maxWidth: "300px" }}
      className=" h-[16rem] w-[18.5rem] flex flex-col"
    >
      <CardHeader className="flex flex-col">
        <motion.div
          variants={imageVariants}
          animate={studyMode ? "study" : "normal"}
          transition={{ duration: 1.0, ease: "easeInOut" }}
        >
          <div className="aspect-4">
            <img
              className=" self-center mt-3 ml-[3.5rem] relative h-32 w-32"
              loading="lazy"
              src={pokeImage}
              alt=""
            />
          </div>
        </motion.div>
        <motion.div
          variants={textVariants}
          animate={studyMode ? "study" : "normal"}
          transition={{ duration: 1.0 }}
        >
          <div className="ml-1">
            <CardTitle className="mt-5 text-l tracking-tight font-roboto font-bold ">
              {pokeName}
            </CardTitle>
            <CardDescription className="text-xs tracking-wide mt-1 font-roboto">
              {type.length === 1 ? type : `${type[0]}, ${type[1]}`}
            </CardDescription>
          </div>
        </motion.div>
        {studyMode ? (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 25, y: -90 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <h3 className="capitalize text-blue-900 text-lg md:text-2xl font-semibold tracking-wide mb-2 font-roboto mt-2">
              {name}
            </h3>
          </motion.div>
        ) : null}
      </CardHeader>
    </Card>
  );
};

export default PokeCardFront;
