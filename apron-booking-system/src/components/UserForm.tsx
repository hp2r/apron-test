import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '../../stitches.config';

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const Input = styled('input', {
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
});

const Select = styled ('select', {
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
})

const CancelButton = styled('button', {
  backgroundColor: 'transparent',
  color: 'Black',
  cursor: 'pointer',
  width: '103px',
  height: '48px',
  padding: '0px 24px 0px 24px',
  borderRadius: '8px',
  border: '2px',
  borderStyle: 'solid',
  borderColor: '#ECEBE3',
});

const ActionButton = styled('button', {
  padding: '0px 24px 0px 24px',
  borderRadius: '8px',
  backgroundColor: 'black',
  color: '#fff',
  width: '337px',
  height: '48px',
  cursor: 'pointer',
});

const FormButtons = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '8px',
});

const Label = styled('label', {
  color: '#706D5C'
});

const MALE_MAX_AGE: number = 111;
const FEMALE_MAX_AGE: number = 117;

interface UserFormProps {
  formTitle: string;
  actionLabel: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  defaultValues?: any;
}

const UserForm = ({ formTitle, actionLabel, onSubmit, onCancel, defaultValues }: UserFormProps) => {
  const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm({
    defaultValues: defaultValues || { gender: '', firstname: '', lastname: '', age: null },
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <>
      <h2>{formTitle}</h2>
      <Form onSubmit={handleSubmit(onSubmit)} aria-label='User Form'>
      <Label>Gender</Label>
      <Select {...register('gender', {required: true})} defaultValue={defaultValues?.gender} aria-label='Gender'>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </Select>
      {errors?.gender?.type === "required" && <div style={{ color: 'red' }}>required</div>}
      <Label>First name</Label>
      <Input {...register('firstname', {required: true, minLength: 5, maxLength: 20})} aria-label='First name'/>
      {errors?.firstname?.type === "required" && <div style={{ color: 'red' }}>required</div>}
      {errors?.firstname?.type === "minLength" && <div style={{ color: 'red' }}>Must be at least 5 characters</div>}
      {errors?.firstname?.type === "maxLength" && <div style={{ color: 'red' }}>Must be less than 20 characters</div>}
      <Label>Last name</Label>
      <Input {...register('lastname', {required: true, minLength: 5, maxLength: 20})} aria-label='Last name'/>
      {errors?.lastname?.type === "required" && <div style={{ color: 'red' }}>required</div>}
      {errors?.lastname?.type === "minLength" && <div style={{ color: 'red' }}>Must be at least 5 characters</div>}
      {errors?.lastname?.type === "maxLength" && <div style={{ color: 'red' }}>Must be less than 20 characters</div>}
      <Label>Age</Label>
      <Input type='number' {...register('age', 
        {required: true, validate: { 
          min: value => { if(value < 18) return 'The minimum age is 18'},
          max: value => { if(value > (getValues().gender === 'Male' ? MALE_MAX_AGE : FEMALE_MAX_AGE)) return `The maximum age for ${getValues().gender} users is ${getValues().gender === 'Male' ? MALE_MAX_AGE : FEMALE_MAX_AGE}`} 
      }})} aria-label='Age'/>
      {errors?.age?.type === "required" && <div style={{ color: 'red' }}>required</div>}
      {errors?.age?.type === "min" && <div style={{ color: 'red' }}>{errors?.age?.message && <div style={{ color: 'red' }}>{errors.age.message as string}</div>}</div>}
      {errors?.age?.type === "max" && <div style={{ color: 'red' }}>{errors?.age?.message && <div style={{ color: 'red' }}>{errors.age.message as string}</div>}</div>}
      <FormButtons aria-controls='form-buttons'>
        <CancelButton aria-label='Cancel' type="button" onClick={onCancel}>Cancel</CancelButton>
        <ActionButton aria-label={actionLabel} type="submit">{actionLabel}</ActionButton>
      </FormButtons>
    </Form>
    </>
  );
};

export default UserForm;
