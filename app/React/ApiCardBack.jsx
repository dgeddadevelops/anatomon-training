/* eslint-disable react/prop-types */
const ApiCardBack = (props) => {
  return (
    <div className="bg-gray-50 p-5 rounded-lg">
      <div className="text-blue-900 text-2xl md:text-3xl font-semibold mb-7 font-roboto">
        {props.muscle}
      </div>
      <div className="text-left">
        <div className="flex">
          <h3 className=" text-indigo-600 text-lg md:text-xl font-semibold mb-1 font-roboto">
            Origin:
          </h3>
          <p className="text-gray-800 text-base leading-relaxed pb-6 mb-2 ml-2 flex-nowrap overflow-x-auto whitespace-nowrap font-roboto">
            {props.origin}
          </p>
        </div>
        <div className="flex">
          <h3 className=" text-indigo-600 text-lg md:text-xl font-semibold mb-1 font-roboto">
            Insertion:
          </h3>
          <p className="text-gray-800 text-base leading-relaxed pb-6 mb-2 ml-2 flex-nowrap overflow-x-auto whitespace-nowrap font-roboto">
            {props.insertion}
          </p>
        </div>
        <div className="flex">
          <h3 className=" text-indigo-600 text-lg md:text-xl font-semibold mb-1 font-roboto">
            Action:
          </h3>
          <p className="text-gray-800 text-base leading-relaxed pb-6 mb-2 ml-2 flex-nowrap overflow-x-auto whitespace-nowrap font-roboto">
            {props.action}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiCardBack;
