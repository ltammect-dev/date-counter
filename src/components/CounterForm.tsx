import { createSignal } from "solid-js";
import { DatePicker } from "./ui/DatePicker";

interface CounterFormProps {
  onSubmit: (data: { name: string; targetDate: string; description?: string }) => void;
  onCancel: () => void;
}

export function CounterForm(props: CounterFormProps) {
  const [name, setName] = createSignal("");
  const [targetDate, setTargetDate] = createSignal("");
  const [targetTime, setTargetTime] = createSignal("00:00");
  const [description, setDescription] = createSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (name().trim() && targetDate()) {
      const fullDateTime = `${targetDate()}T${targetTime()}`;
      props.onSubmit({
        name: name().trim(),
        targetDate: fullDateTime,
        description: description().trim(),
      });
      // Reset form
      setName("");
      setTargetDate("");
      setTargetTime("00:00");
      setDescription("");
    }
  };

  return (
    <div class="bg-white p-6 rounded-lg border border-blue-200 mb-6">
      <h2 class="text-blue-900 text-lg mb-4 font-bold">Add New Counter</h2>
      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <input
            id="name"
            type="text"
            class="w-full px-3 py-2 bg-white text-blue-900 rounded border border-blue-300 focus:border-blue-500 focus:outline-none"
            placeholder="Ví dụ: Thi TOEIC, Tết Nguyên Đán, Giáng Sinh..."
            value={name()}
            onInput={(e) => setName(e.target.value)}
          />
        </div>

        <div class="flex gap-3">
          <DatePicker value={targetDate()} onChange={setTargetDate} />
          <input
            id="targetTime"
            type="time"
            class="w-full px-3 py-2 bg-white text-blue-900 rounded-l border border-blue-300 focus:border-blue-500 focus:outline-none"
            value={targetTime()}
            onInput={(e) => setTargetTime(e.target.value)}
          />
        </div>

        <div class="flex items-center justify-end gap-4">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-l transition-colors"
            disabled={!name().trim() || !targetDate()}
          >
            Add Counter
          </button>
          <button
            type="button"
            class="bg-gray-200 hover:bg-gray-300 text-blue-900 px-4 py-2 rounded-r border border-blue-300 transition-colors"
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
