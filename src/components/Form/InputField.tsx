import { InputHTMLAttributes, ChangeEvent, useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { PdfModeContext } from '../Document/PdfCaptureRenderer';

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  ink?: boolean;
  name?: string;
  type?: 'text' | 'number' | 'email' | 'tel' | 'date' | 'datetime-local';
}

export default function InputField({ label, name, ink = true, className = '', type = 'text', ...props }: InputFieldProps) {
  const formContext = useFormContext();
  const isPdfMode = useContext(PdfModeContext);
  
  // Format date DD/MM/YYYY
  const formatDate = (val: string) => {
    let v = val.replace(/\D/g, '').slice(0, 8);
    if (v.length >= 5) {
      return `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4)}`;
    } else if (v.length >= 3) {
      return `${v.slice(0,2)}/${v.slice(2)}`;
    }
    return v;
  };

  // Format datetime DD/MM/YYYY HH:MM
  const formatDateTime = (val: string) => {
    let v = val.replace(/\D/g, '').slice(0, 12);
    let res = '';
    if (v.length > 0) res += v.slice(0, 2);
    if (v.length > 2) res += '/' + v.slice(2, 4);
    if (v.length > 4) res += '/' + v.slice(4, 8);
    if (v.length > 8) res += ' ' + v.slice(8, 10);
    if (v.length > 10) res += ':' + v.slice(10, 12);
    return res;
  };

  const isDateType = type === 'date' || type === 'datetime-local';
  
  // When formatting, we override the default type to 'text' so we can show slashes/colons
  const actualType = isDateType ? 'text' : type;

  const registerProps = (formContext && name) ? formContext.register(name) : {} as any;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    if (type === 'date') {
      e.target.value = formatDate(val);
    } else if (type === 'datetime-local') {
      e.target.value = formatDateTime(val);
    }
    
    // Call the react-hook-form onChange if present
    if (registerProps.onChange) {
      registerProps.onChange(e);
    }
  };

  // For dates, we intercept the onChange to format it BEFORE react-hook-form sees it
  const finalProps = {
    ...registerProps,
    onChange: isDateType ? handleChange : registerProps.onChange
  };

  const val = formContext && name ? formContext.getValues(name) : '';

  if (isPdfMode) {
    return (
      <div className={`form-group ${className}`}>
        {label && <label className="form-label">{label}</label>}
        <div className={`form-input ${ink ? 'ink' : ''} bg-transparent border-transparent min-h-[36px] flex items-center`}>
          {val || ''}
        </div>
      </div>
    );
  }

  return (
    <div className={`form-group ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <input 
        type={actualType}
        placeholder={isDateType ? (type === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:MM') : props.placeholder}
        className={`form-input ${ink ? 'ink' : ''} ${props.disabled ? 'bg-slate-50 border-slate-200' : ''}`}
        {...finalProps}
        {...props} 
      />
    </div>
  );
}
