import { SimpleForm, Create , required, TextInput, ReferenceInput, NumberInput, SelectInput } from "react-admin";


export const ChallengeCreate = () => {
  return (
    <Create>
        <SimpleForm> 
         
         <TextInput  source="question"
          validate={[required()]} 
          label="Question" />
         
        <ReferenceInput
           source="lessonId"
           reference="lessons"
         />
        <SelectInput
  source="type" // ✅ lowercase to match schema
  choices={[
    { id: "SELECT", name: "SELECT" },
    { id: "ASSIST", name: "ASSIST" },
  ]}
  validate={[required()]}
/>

         <NumberInput
          source="order"
          validate={[required()]}
          label="Order"

          />
        </SimpleForm>


    </Create>
  
  );
};

