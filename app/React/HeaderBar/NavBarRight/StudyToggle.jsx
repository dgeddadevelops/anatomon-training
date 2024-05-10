import { useContext } from 'react'
import { StudyToggleContext } from "~/React/StudyToggleContext";
import { Switch } from "../../../shadcn/components/ui/switch";
import { Label } from "../../../shadcn/components/ui/label";

const StudyToggle = () => {
  const [studyMode, setStudyMode] = useContext(StudyToggleContext);

  return (
    <div className="flex flex-col items-center mt-1 ml-[250px] font-roboto text-cyan-300 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold">
      <Switch
        className="mt-4"
        id="studytoggle"
        onCheckedChange={() => setStudyMode(!studyMode)}
        checked={studyMode}
      />
      <Label
        htmlFor="studytoggle"
        className=" mt-1 font-roboto text-cyan-300 font-bold"
      >
        Study Mode
      </Label>
    </div>
  )
}

export default StudyToggle