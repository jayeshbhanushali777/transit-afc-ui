import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { routeService } from '../../api/services/routeService';
import { RouteSearchParams, RouteSearchResponse } from '../../types/route.types';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

const searchSchema = z.object({
  fromStationId: z.string().min(1, 'Please select source station'),
  toStationId: z.string().min(1, 'Please select destination station'),
  departureDate: z.string(),
  passengerCount: z.number().min(1).max(10),
});

type SearchFormData = z.infer<typeof searchSchema>;

interface RouteSearchProps {
  onSearchComplete: (response: RouteSearchResponse) => void;
}

export const RouteSearch: React.FC<RouteSearchProps> = ({ onSearchComplete }) => {
  const [isSearching, setIsSearching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      departureDate: new Date().toISOString().split('T')[0],
      passengerCount: 1,
    },
  });

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true);
    try {
      const searchParams: RouteSearchParams = {
        ...data,
        departureDate: new Date(data.departureDate).toISOString(),
      };

      const response = await routeService.searchRoutes(searchParams);
      
      if (response.isSuccess && response.data) {
        onSearchComplete(response.data);
      } else {
        toast.error(response.message || 'Search failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Search failed');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="From Station ID"
          {...register('fromStationId')}
          error={errors.fromStationId?.message}
        />
        <Input
          label="To Station ID"
          {...register('toStationId')}
          error={errors.toStationId?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Departure Date"
          type="date"
          {...register('departureDate')}
          error={errors.departureDate?.message}
        />
        <Input
          label="Passengers"
          type="number"
          {...register('passengerCount', { valueAsNumber: true })}
          error={errors.passengerCount?.message}
        />
      </div>

      <Button type="submit" fullWidth isLoading={isSearching}>
        Search Routes
      </Button>
    </form>
  );
};