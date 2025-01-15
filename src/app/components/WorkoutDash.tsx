import ExerciseBrowser from "./ExerciseBrowser";

export default function WorkoutDash() {
  return (
    <div id="workouts-container" className='flex flex-col px-52 pb-52 '>
      <div className='flex flex-col h-96 w-full'>
        <div className='flex justify-between p-4'>
          <p className='text-3xl font-bold'>Find Exercises:</p>
          {/* <button className='bg-nordicGray text-white rounded-md px-2 py-1'>Create workout</button> */}
        </div>

        <div>
          <ExerciseBrowser />
        </div>
      </div>
    </div>
  )
}