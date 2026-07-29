import { KeyboardEvent, useState } from 'react';
import { Plus, X } from 'lucide-react';

interface TagInputProps {
  label: string;
  placeholder?: string;
  values: string[];
  onChange: (values: string[]) => void;
}

export default function TagInput({ label, placeholder, values, onChange }: TagInputProps) {
  const [draft, setDraft] = useState('');

  const addTag = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (values.some((v) => v.toLowerCase() === trimmed.toLowerCase())) {
      setDraft('');
      return;
    }
    onChange([...values, trimmed]);
    setDraft('');
  };

  const removeTag = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && draft === '' && values.length > 0) {
      removeTag(values.length - 1);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <div className="flex flex-wrap gap-1.5 rounded-lg border border-slate-300 p-2 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-shadow">
        {values.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(i)}
              className="text-brand-400 hover:text-brand-700"
              aria-label={`Remove ${tag}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={placeholder || 'Type and press Enter'}
          className="flex-1 min-w-[100px] border-none outline-none text-sm py-0.5 placeholder:text-slate-400"
        />
      </div>
      <button
        type="button"
        onClick={addTag}
        className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
      >
        <Plus size={12} /> Add {label.toLowerCase().replace(/s$/, '')}
      </button>
    </div>
  );
}
