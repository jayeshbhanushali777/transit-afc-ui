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
  Source: z.string().min(1, 'Please enter source station'),
  Destination: z.string().min(1, 'Please enter destination station'),
  DepartureTime: z.string().optional(),
  TransportMode: z.string().optional(),
  PreferFastest: z.boolean().optional(),
  MaxTransfers: z.number().min(0).max(5).optional(),
  IncludeAccessibility: z.boolean().optional(),
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
      PreferFastest: true,
      MaxTransfers: 3,
      IncludeAccessibility: true,
    },
  });

  const onSubmit = async (data: SearchFormData) => {
    setIsSearching(true);
    try {
      const searchParams: RouteSearchParams = {
        Source: data.Source,
        Destination: data.Destination,
        DepartureTime: data.DepartureTime || new Date().toISOString(),
        TransportMode: data.TransportMode,
        PreferFastest: data.PreferFastest,
        MaxTransfers: data.MaxTransfers,
        IncludeAccessibility: data.IncludeAccessibility,
        Language: 'en',
      };

      const response = await routeService.searchRoutes(searchParams);
      
      if (response.isSuccess && response.data) {
        onSearchComplete(response.data);
        toast.success(`Found ${response.data.routes.length} routes!`);
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
          label="Source Station"
          placeholder="Enter source station ID"
          {...register('Source')}
          error={errors.Source?.message}
        />
        <Input
          label="Destination Station"
          placeholder="Enter destination station ID"
          {...register('Destination')}
          error={errors.Destination?.message}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Departure Time (Optional)"
          type="datetime-local"
          {...register('DepartureTime')}
          error={errors.DepartureTime?.message}
        />
        <Input
          label="Transport Mode (Optional)"
          placeholder="e.g., Metro, Bus"
          {...register('TransportMode')}
          error={errors.TransportMode?.message}
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('PreferFastest')}
            className="w-4 h-4 text-primary-600 rounded"
          />
          <span className="text-sm font-medium text-gray-700">Prefer Fastest Route</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register('IncludeAccessibility')}
            className="w-4 h-4 text-primary-600 rounded"
          />
          <span className="text-sm font-medium text-gray-700">Include Accessibility Info</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Maximum Transfers
        </label>
        <input
          type="number"
          min="0"
          max="5"
          {...register('MaxTransfers', { valueAsNumber: true })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <Button type="submit" fullWidth isLoading={isSearching}>
        Search Routes
      </Button>
    </form>
  );
};