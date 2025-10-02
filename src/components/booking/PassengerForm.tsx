import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreatePassengerRequest, PassengerType } from '../../types/booking.types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

const passengerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  passengerType: z.nativeEnum(PassengerType),
  age: z.number().min(0).max(120).optional(),
  gender: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional().refine(
    (val) => !val || val === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: 'Invalid email address' }
  ),
  specialRequests: z.string().optional(),
  hasWheelchairAccess: z.boolean().optional(),
  isPrimaryPassenger: z.boolean().optional(),
});

type PassengerFormData = z.infer<typeof passengerSchema>;

interface PassengerFormProps {
  onAdd: (passenger: CreatePassengerRequest) => void;
  passengerNumber: number;
}

export const PassengerForm: React.FC<PassengerFormProps> = ({ onAdd, passengerNumber }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PassengerFormData>({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      passengerType: PassengerType.Adult,
      hasWheelchairAccess: false,
      isPrimaryPassenger: passengerNumber === 1,
    },
  });

  const onSubmit = (data: PassengerFormData) => {
    onAdd({
      ...data,
      isPrimaryPassenger: passengerNumber === 1,
    } as CreatePassengerRequest);
    reset();
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Passenger {passengerNumber}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name *"
            placeholder="John"
            error={errors.firstName?.message}
            {...register('firstName')}
          />

          <Input
            label="Last Name *"
            placeholder="Doe"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passenger Type *
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('passengerType', { valueAsNumber: true })}
            >
              <option value={PassengerType.Adult}>Adult</option>
              <option value={PassengerType.Child}>Child</option>
              <option value={PassengerType.Senior}>Senior</option>
              <option value={PassengerType.Student}>Student</option>
              <option value={PassengerType.Disabled}>Disabled</option>
            </select>
          </div>

          <Input
            label="Age"
            type="number"
            placeholder="25"
            {...register('age', { valueAsNumber: true })}
            error={errors.age?.message}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('gender')}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Contact Phone"
            type="tel"
            placeholder="+1234567890"
            error={errors.contactPhone?.message as string}
            {...register('contactPhone')}
          />

          <Input
            label="Contact Email"
            type="email"
            placeholder="passenger@email.com"
            error={errors.contactEmail?.message as string}
            {...register('contactEmail')}
          />
        </div>

        <Input
          label="Special Requests"
          placeholder="Any special requirements..."
          {...register('specialRequests')}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="wheelchairAccess"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            {...register('hasWheelchairAccess')}
          />
          <label htmlFor="wheelchairAccess" className="ml-2 text-sm text-gray-700">
            Requires wheelchair access
          </label>
        </div>

        <Button type="submit" fullWidth>
          Add Passenger
        </Button>
      </form>
    </div>
  );
};