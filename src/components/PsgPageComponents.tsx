import { IconType } from 'react-icons';
import * as yup from 'yup';

type PerDayNutritionBoxData = {
  time: string;
  nutritionNeeds: {
    energy: string;
    carbo: string;
    fat: string;
    protein: string;
  };
};

export const validationDto = yup.object({
  name: yup.string().required('Nama wajib diisi'),
  age: yup.number().min(0, 'Umur minimal 0').required('Umur wajib diisi'),
  weight: yup.number().positive('Berat badan wajib diisi').required('Berat badan wajib diisi'),
  height: yup.number().positive('Tinggi badan wajib diisi').required('Tinggi wajib diisi'),
  gender: yup.string().oneOf(['male', 'female'], 'Jenis kelamin wajib dipilih').required('Jenis kelamin wajib dipilih'),
});

export const FormLabel = ({ label }: { label: string }) => <p className='mb-1 text-sm font-semibold'>{label}</p>;

export const NutritionBox = (props: NutritionBoxData) => {
  return (
    <div className='relative flex h-24 w-24 flex-col justify-end rounded-md bg-white pb-5 shadow-lg md:w-28 lg:h-28 lg:w-32'>
      <props.Icon className='absolute -top-5 left-1/2 -translate-x-1/2 transform text-4xl md:-top-7 md:text-5xl xl:-top-8 xl:text-6xl' />
      <h4 className='text-lg font-bold'>{props.result}</h4>
      <p>{props.title}</p>
    </div>
  );
};

export const PerDayNutritionBox = (props: PerDayNutritionBoxData) => {
  return (
    <div className='space-y-7 border-b p-6 capitalize'>
      <h2 className='text-xl font-bold'>Porsi {props.time}</h2>

      <div className='grid grid-cols-2 gap-y-4 text-center lg:grid-cols-4'>
        <div className=''>
          <h3 className='mb-1 font-bold'>{props.nutritionNeeds.energy}kkal</h3>
          <p>Energi</p>
        </div>

        <div className=''>
          <h3 className='mb-1 font-bold'>{props.nutritionNeeds.fat}g</h3>
          <p>Lemak</p>
        </div>

        <div className=''>
          <h3 className='mb-1 font-bold'>{props.nutritionNeeds.carbo}g</h3>
          <p>Karbohidrat</p>
        </div>

        <div className=''>
          <h3 className='mb-1 font-bold'>{props.nutritionNeeds.protein}g</h3>
          <p>Protein</p>
        </div>
      </div>
    </div>
  );
};

export const InterpretationLabelBtn = ({ status, hex }: InterpretationLabelBtnData) => {
  return (
    <div className='flex flex-row items-center'>
      <h3 className='text-lg font-bold md:text-xl'>Interpretasi</h3>
      <span className='ml-3 rounded-md px-4 py-2 text-xs font-bold text-white md:px-5 md:text-sm' style={{ background: hex }}>
        {status}
      </span>
    </div>
  );
};
