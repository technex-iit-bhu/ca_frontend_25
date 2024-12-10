import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const InputFormField = ({
  form,
  name,
  label,
  type = 'text',
  placeholder,
  isBig = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  isBig?: boolean;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="text-gray-300">{label}</FormLabel>
        <FormControl>
          {!isBig ? (
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className="rounded-lg border-rose-900 bg-[#2e2e2e] text-white"
            />
          ) : (
            <Textarea placeholder={placeholder} {...field} className="bg-[#2e2e2e] text-white" />
          )}
        </FormControl>

        <FormMessage />
      </FormItem>
    )}
  />
);
