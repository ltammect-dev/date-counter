import { For } from "solid-js";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/Accordion";

export interface CountdownData {
  _id: string;
  name: string;
  targetDate: string;
  description?: string;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  isExpired: boolean;
}

interface CounterListProps {
  counters: CountdownData[];
  onDelete: (id: string) => void;
}

export function CounterList(props: CounterListProps) {
  return (
    <Accordion collapsible multiple={false} class="space-y-4">
      <For each={props.counters}>
        {(counter) => (
          <AccordionItem
            value={counter._id}
            trigger={
              <AccordionTrigger class="bg-white p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
                <div class="flex justify-between items-center w-full">
                  <div class="text-left flex flex-row gap-8 items-center justify-center">
                    <h3 class="text-blue-900 text-xl font-bold">{counter.name}</h3>
                    <p class="text-blue-700 text-sm">{new Date(counter.targetDate).toLocaleString('vi-VN')}</p>
                  </div>
                  <button
                    onClick={() => props.onDelete(counter._id)}
                    class="text-red-500 hover:text-red-700 transition-colors p-1 ml-4"
                    title="Xóa counter"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </AccordionTrigger>
            }
            content={
              <AccordionContent class="bg-white p-4 rounded-lg border border-blue-200 mt-2">
                {counter.isExpired ? (
                  <div class="text-center">
                    <p class="text-red-500 text-2xl font-bold">🎉 Time's up! 🎉</p>
                  </div>
                ) : (
                  <div class="flex justify-center space-x-4 text-center">
                    <div class="flex flex-col items-center">
                      <div class="text-3xl font-bold text-blue-900">{counter.timeLeft.days.toString().padStart(2, '0')}</div>
                      <div class="text-sm text-blue-600 uppercase tracking-wider">Days</div>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="text-3xl font-bold text-blue-900">{counter.timeLeft.hours.toString().padStart(2, '0')}</div>
                      <div class="text-sm text-blue-600 uppercase tracking-wider">Hours</div>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="text-3xl font-bold text-blue-900">{counter.timeLeft.minutes.toString().padStart(2, '0')}</div>
                      <div class="text-sm text-blue-600 uppercase tracking-wider">Minutes</div>
                    </div>
                    <div class="flex flex-col items-center">
                      <div class="text-3xl font-bold text-blue-900">{counter.timeLeft.seconds.toString().padStart(2, '0')}</div>
                      <div class="text-sm text-blue-600 uppercase tracking-wider">Seconds</div>
                    </div>
                  </div>
                )}
              </AccordionContent>
            }
          />
        )}
      </For>
    </Accordion>
  );
}