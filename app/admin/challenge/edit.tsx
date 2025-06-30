import { SimpleForm, Create , required, TextInput, ReferenceInput, NumberInput, SelectInput, Edit } from "react-admin";


export const ChallengeEdit = () => {
  return (
    <Edit>
        <SimpleForm> 
         
         <TextInput  source="question"
          validate={[required()]} 
          label="Question" />
         
        <ReferenceInput
           source="lessonId"
           reference="lessons"
         />
         <SelectInput
           source="Type"
                   choices={[
              {
                id: "SELECT",
                name: "SELECT",
              },
              {
                id: "ASSIST",
                name: "ASSIST",

              }
             ]}
              validate={[required()]} 
          />
         <NumberInput
          source="order"
          validate={[required()]}
          label="Order"

          />
        </SimpleForm>


    </Edit>
  
  );
};

