import {
  difficultyLevelOptions,
  equipmentOptions,
  exerciseDays,
  focusOptions,
  intensifiersUsed,
  locationsOptions,
  numberOfPerWeek,
  numberOfWeekOptions,
  progress,
  trainingOptions,
  workoutDurationOptions,
} from "@/utils/selectorOptions";
import InputField from "@/components/InputField";
import SelectField from "@/components/SelectField";
import { useState } from "react";
import MultiSelectField from "@/components/MultiSelectField";
import { Card, CardContent } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import axios from "axios";
import { useProgramStore } from "@/stores/programStore";
import { useRouter } from "next/router";

export default function Home() {
  const setProgram = useProgramStore((state) => state.setProgram);
  const router = useRouter();
  const [formData, setFormData] = useState({
    programName: "",
    weeks: "",
    difficulty: "",
    training: [],
    primaryFocus: [],
    secondaryFocus: [],
    intensifiersUsed: [],
    exerciseDays: "",
    perWeekDay: "",
    workoutTime: "",
    setsPerDay: "",
    locations: "",
    equipment: "",
    progress: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiChange = (selected, name) => {
    setFormData({ ...formData, [name]: selected });
  };

  const generatePlan = async () => {
    const programPrompt = `
          Create a ${formData.weeks}-week fitness program called "${formData.programName}". 
          This program should follow the ${formData.training} training style and is designed for someone at the ${formData.difficulty} level.

          The primary focus of this program is ${formData.primaryFocus}, with a secondary focus on ${formData.secondaryFocus}. 
          The user will train ${formData.perWeekDay} days per week, with each session lasting around ${formData.workoutTime} minutes.

          Each workout should include exactly 2 exercises and a total of 14 sets per day.

          The workouts will be performed at ${formData.locations}, and the available equipment includes: ${formData.equipment}.

          Use the following training intensifiers where applicable: ${formData.intensifiersUsed}.

          Do you want the program to progressively get more challenging each week? ${formData.progress}

          Please structure the program clearly by week and day. 
          Label each circuit using letters (A, B, C, etc.), and label exercises within each circuit using A1, A2, B1, etc and also
          for example circuit consists of  exercise A have name training intensifiers like Regular set etc and also equipment name , set ,Reps, rest time and Nots for example where is format
          day1 : {
            "A": {
                "exercise1": "A1",
                "equipment" : "Barbell and rack"
                "sets": 3,
                "reps" : "12,10,8",
                "rest-time" : "12,23,12",
                "Note" : "1-3-1 tempo"
            },
        and so on
}`;
    // const payload = {
    //   prompt: programPrompt,
    // };
    try {
      // const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/plan/generate`,
      //   payload
      // );
      // const parsed = JSON.parse(response.data.result);
      // const generatedData = parsed[formData.programName];
      const data = {
        name: "4-week Intermediate Level Hypertrophy & Strength Training",
        level: "intermediate",
        training_style: ["hypertrophy_muscle_building", "strength_training"],
        focus: {
          primary: ["upper_body", "full_body", "cardio"],
          secondary: ["full_body", "upper_body", "chest"],
        },
        frequency: 5,
        session_duration: "45-60 minutes",
        equipment: ["machine_only"],
        training_intensifiers: ["superset", "regularset"],
        progressive_overload: true,
        program_structure: {
          week1: {
            day1: {
              A: {
                id: "week1-day1-A",
                exercise1: "A1",
                training_intensifiers: "superset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week1-day1-B",
                exercise2: "B1",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day2: {
              A: {
                id: "week1-day2-A",
                exercise1: "A2",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week1-day2-B",
                exercise2: "B2",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day3: {
              A: {
                id: "week1-day3-A",
                exercise1: "A3",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week1-day3-B",
                exercise2: "B3",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day4: {
              A: {
                id: "week1-day4-A",
                exercise1: "A4",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week1-day4-B",
                exercise2: "B4",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day5: {
              A: {
                id: "week1-day5-A",
                exercise1: "A5",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week1-day5-B",
                exercise2: "B5",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
          },
          week2: {
            day1: {
              A: {
                id: "week2-day1-A",
                exercise1: "A6",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week2-day1-B",
                exercise2: "B6",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day2: {
              A: {
                id: "week2-day2-A",
                exercise1: "A7",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week2-day2-B",
                exercise2: "B7",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day3: {
              A: {
                id: "week2-day3-A",
                exercise1: "A8",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week2-day3-B",
                exercise2: "B8",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day4: {
              A: {
                id: "week2-day4-A",
                exercise1: "A9",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week2-day4-B",
                exercise2: "B9",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day5: {
              A: {
                id: "week2-day5-A",
                exercise1: "A10",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week2-day5-B",
                exercise2: "B10",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
          },
          week3: {
            day1: {
              A: {
                id: "week3-day1-A",
                exercise1: "A11",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week3-day1-B",
                exercise2: "B11",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day2: {
              A: {
                id: "week3-day2-A",
                exercise1: "A12",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week3-day2-B",
                exercise2: "B12",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day3: {
              A: {
                id: "week3-day3-A",
                exercise1: "A13",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week3-day3-B",
                exercise2: "B13",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day4: {
              A: {
                id: "week3-day4-A",
                exercise1: "A14",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week3-day4-B",
                exercise2: "B14",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day5: {
              A: {
                id: "week3-day5-A",
                exercise1: "A15",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week3-day5-B",
                exercise2: "B15",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
          },
          week4: {
            day1: {
              A: {
                id: "week4-day1-A",
                exercise1: "A16",
                training_intensifiers: "superset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week4-day1-B",
                exercise2: "B16",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day2: {
              A: {
                id: "week4-day2-A",
                exercise1: "A17",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week4-day2-B",
                exercise2: "B17",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day3: {
              A: {
                id: "week4-day3-A",
                exercise1: "A18",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week4-day3-B",
                exercise2: "B18",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day4: {
              A: {
                id: "week4-day4-A",
                exercise1: "A19",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week4-day4-B",
                exercise2: "B19",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
            day5: {
              A: {
                id: "week4-day5-A",
                exercise1: "A20",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
              B: {
                id: "week4-day5-B",
                exercise2: "B20",
                training_intensifiers: "regularset",
                sets: 7,
                reps: "12,10,8",
                rest_time: "95,155,135",
                note: "1-3-1 tempo",
              },
            },
          },
        },
      };
      
      // setProgram(generatedData);
      // console.log(generatedData);
      setProgram(data);
      router.push("/program");
    } catch (error) {
      console.error("Error generating plan:", error);
    }
  };

  return (
    <div className="flex justify-around min-h-screen bg-gray-50 px-4 ">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl w-7xl space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">
          Fitness Program Prompt Builder
        </h1>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectField
            label="Number of Weeks"
            name="weeks"
            options={numberOfWeekOptions}
            value={formData.weeks}
            onChange={handleChange}
            placeholder="Select  Number Of Weeks"
          />

          <InputField
            label="Program Name"
            name="programName"
            value={formData.programName}
            onChange={handleChange}
            placeholder="Enter program name"
          />

          <MultiSelectField
            label="Training Modality"
            options={trainingOptions}
            selected={formData.training}
            onChange={(selected) => handleMultiChange(selected, "training")}
          />

          <SelectField
            label="Difficulty Level"
            name="difficulty"
            options={difficultyLevelOptions}
            value={formData.difficulty}
            onChange={handleChange}
            placeholder="Select difficulty"
          />

          <MultiSelectField
            label="Primary Focus"
            options={focusOptions}
            selected={formData.primaryFocus}
            onChange={(selected) => handleMultiChange(selected, "primaryFocus")}
          />

          <MultiSelectField
            label="Secondary Focus"
            options={focusOptions}
            selected={formData.secondaryFocus}
            onChange={(selected) =>
              handleMultiChange(selected, "secondaryFocus")
            }
          />
          <SelectField
            label="Days Per Week"
            name="perWeekDay"
            options={numberOfPerWeek}
            value={formData.perWeekDay}
            onChange={handleChange}
            placeholder="Select Day Per Week"
          />
          <SelectField
            label="How Long Per Workout"
            name="workoutTime"
            options={workoutDurationOptions}
            value={formData.workoutTime}
            onChange={handleChange}
            placeholder="Select Time"
          />

          <SelectField
            label="Exercise Days Per Day"
            name="exerciseDays"
            options={exerciseDays}
            value={formData.exerciseDays}
            onChange={handleChange}
            placeholder="Select Exercise Per Day"
          />
          <SelectField
            label="Sets Per Day"
            name="setsPerDay"
            options={numberOfWeekOptions}
            value={formData.setsPerDay}
            onChange={handleChange}
            placeholder="Select Sets Per Day"
          />

          <SelectField
            label="Location"
            name="locations"
            options={locationsOptions}
            value={formData.locations}
            onChange={handleChange}
            placeholder="Select Location"
          />
          <SelectField
            label="Equipment"
            name="equipment"
            options={equipmentOptions}
            value={formData.equipment}
            onChange={handleChange}
            placeholder="Select Equipment List"
          />

          <MultiSelectField
            label="Intensifiers Used"
            options={intensifiersUsed}
            selected={formData.intensifiersUsed}
            onChange={(selected) =>
              handleMultiChange(selected, "intensifiersUsed")
            }
          />
          <SelectField
            label="Want Progress"
            name="progress"
            options={progress}
            value={formData.progress}
            onChange={handleChange}
            placeholder="Select Want progress"
          />
        </form>
        {/* <textarea
            id="message"
            rows="25"
            class="block p-4 w-full text-sm  bg-[#FAF5FF] border-none focus:[#FAF5FF]  h-96  resize-none rounded-2xl"
            placeholder="Write your thoughts here..."
          /> */}
        <Card className="flex flex-col items-center justify-center gap-4 p-8 w-full bg-[#faf5ff] rounded-3xl">
          <h2 className="w-full font-['Poppins',Helvetica] font-semibold text-brandgrey text-2xl">
            Fitness Program Prompt Bulder
          </h2>
          <CardContent className="p-0 w-full font-['Poppins',Helvetica] font-normal text-[#000000] text-base leading-[19.2px]">
            Create a {formData.weeks} fitness program called &#34;
            {formData.programName}&#34;. This program should follow the
            {formData.training}
            training style and is designed for someone at the{" "}
            {formData.difficulty} level.
            <br />
            <br />
            The primary focus of this program is {formData.primaryFocus}, with a
            secondary focus on
            {formData.secondaryFocus}. The user will train
            {formData.perWeekDay}
            days per week, with each session lasting around{" "}
            {formData.workoutTime} minutes.
            <br />
            <br />
            Each workout should include exactly 2 exercises and a total of 14
            sets per day.
            <br />
            <br />
            The workouts will be performed at {formData.locations}, and the
            available equipment includes: {formData.equipment}.
            <br />
            <br />
            Use the following training intensifiers where applicable:{" "}
            {formData.intensifiersUsed}.
            <br />
            <br />
            Do you want the program to progressively get more challenging each
            week? {formData.progress}.
            <br />
            <br />
            Please structure the program clearly by week and day. Label each
            circuit using letters (A, B, C, etc.), and label exercises within
            each circuit using A1, A2, B1, etc.
          </CardContent>
          <div className="relative w-6 h-6">
            <img
              className="absolute w-[21px] h-6 top-0 left-px"
              alt="Group"
              src="/assets/copyIcon.svg"
            />
          </div>
        </Card>
        <div className="flex items-center justify-center w-full">
          <Button
            className="w-[199px] h-14 px-6 py-2 bg-primary bg-blue-600 hover:bg-blue-700 rounded-xl"
            onClick={generatePlan}
          >
            <span className="font-button-large font-[number:var(--button-large-font-weight)] text-[#ffffff] text-[length:var(--button-large-font-size)] tracking-[var(--button-large-letter-spacing)] leading-[var(--button-large-line-height)]">
              Generate Program
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
