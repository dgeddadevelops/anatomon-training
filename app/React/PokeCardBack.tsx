import { useContext } from "react";

import type { Pokemon } from "~/poke-data/pokemon";
import { Card, CardTitle } from "~/shadcn/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/shadcn/components/ui/table";

import ApiCardBack from "./ApiCardBack";
import { StudyToggleContext } from "./StudyToggleContext";

const PokeCardBack = (props: Pokemon) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { pokeName, pokeImage, name, rest } = props;
  const { hp, attack, defense, special_attack, special_defense, speed } = rest;
  const { origin, insertion, action } = rest;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [studyToggle] = useContext(StudyToggleContext);

  return !studyToggle ? (
    <Card className="h-[16rem] w-[18.5rem] flex flex-col border-[1px]">
      <CardTitle className="text-l tracking-tight font-roboto font-bold ">
        {pokeName}
      </CardTitle>
      <div className="aspect-4 absolute -left-[30px] -top-[30px]">
        <img
          style={{
            transform: "scale(.45)",
          }}
          className="h-32 w-32"
          loading="lazy"
          src={pokeImage}
          alt=""
        />
      </div>
      <Table className="font-roboto">
        <TableCaption>A list of Poke Powers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">hp</TableHead>
            <TableHead className="text-center">attack</TableHead>
            <TableHead className="text-center">defense</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{hp}</TableCell>
            <TableCell>{attack}</TableCell>
            <TableCell>{defense}</TableCell>
          </TableRow>
        </TableBody>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">sp attack</TableHead>
            <TableHead className="text-center">sp defense</TableHead>
            <TableHead className="text-center">speed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{special_attack}</TableCell>
            <TableCell>{special_defense}</TableCell>
            <TableCell>{speed}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  ) : (
    <ApiCardBack
      muscle={name}
      origin={origin}
      insertion={insertion}
      action={action}
    />
  );
};

export default PokeCardBack;
