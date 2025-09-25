import { createSignal, onMount, onCleanup, Show } from "solid-js";
import { CounterForm } from "./components/CounterForm";
import { CounterList } from "./components/CounterList";
import { Toaster, toast } from "./components/ui/Sonner";
import {
  startCountdown,
  stopCountdown,
  store,
  setCounters,
  addCounter,
  removeCounter,
  setLoading,
  setError,
} from "./stores/countdownStore";
import { apiService, CreateCounterData } from "./services/apiService";

function App() {
  const [showForm, setShowForm] = createSignal(false);

  // Load counters khi component mount
  const loadCounters = async () => {
    try {
      setLoading(true);
      setError(null);
      const counters = await apiService.getCounters();
      setCounters(counters);
    } catch (error) {
      console.error("Failed to load counters:", error);
      setError(error instanceof Error ? error.message : "Failed to load counters");
    } finally {
      setLoading(false);
    }
  };

  // Thêm counter mới
  const handleAddCounter = async (data: CreateCounterData) => {
    try {
      setError(null);
      const newCounter = await apiService.createCounter(data);
      addCounter(newCounter);
      setShowForm(false);
      toast.success("Counter đã được thêm thành công!");
    } catch (error) {
      console.error("Failed to create counter:", error);
      setError(error instanceof Error ? error.message : "Failed to create counter");
      toast.error("Không thể thêm counter. Vui lòng thử lại.");
    }
  };

  // Xóa counter
  const handleDeleteCounter = async (id: string) => {
    try {
      setError(null);
      await apiService.deleteCounter(id);
      removeCounter(id);
      toast.success("Counter đã được xóa thành công!");
    } catch (error) {
      console.error("Failed to delete counter:", error);
      setError(error instanceof Error ? error.message : "Failed to delete counter");
      toast.error("Không thể xóa counter. Vui lòng thử lại.");
    }
  };

  onMount(() => {
    loadCounters();
    startCountdown();
  });

  onCleanup(() => {
    stopCountdown();
  });

  return (
    <main class="bg-blue-50 pt-8 pb-12 min-h-screen relative">
      <img
        class="absolute z-20 min-h-42 max-h-51.5 bottom-0 left-0 right-0 w-full pointer-events-none object-top object-cover"
        src="images/pattern-hills.svg"
        alt="Hills pattern"
      />
      <img
        class="absolute z-10 top-0 bottom-0 h-full object-cover pointer-events-none"
        src="images/bg-stars.svg"
        alt="Background stars pattern"
      />

      <div class="relative z-30 container mx-auto px-4 max-w-4xl">
        <header class="text-center mb-8 flex flex-row justify-between items-center">
          <h1 class="text-blue-900 text-2xl md:text-3xl mb-4 font-bold">🕐 Counter</h1>
          {/* Add Counter Button */}
          <div class="text-center mb-8">
            <button
              onClick={() => setShowForm(!showForm())}
              class="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              <span class="text-lg">+</span>
              {showForm() ? "Cancel" : "Add counter"}
            </button>
          </div>
        </header>

        {/* Error Display */}
        <Show when={store.error}>
          <div class="bg-red-500 bg-opacity-90 text-white p-4 rounded-lg mb-6 border border-red-400">
            <p class="font-semibold">Error: {store.error}</p>
          </div>
        </Show>

        {/* Counter Form */}
        <Show when={showForm()}>
          <CounterForm onSubmit={handleAddCounter} onCancel={() => setShowForm(false)} />
        </Show>

        {/* Loading State */}
        <Show when={store.isLoading}>
          <div class="text-center text-blue-700 py-8">
            <p>Loading...</p>
          </div>
        </Show>

        {/* Counter List */}
        <Show when={!store.isLoading}>
          <Show
            when={store.counters.length > 0}
            fallback={
              <div class="text-center text-blue-700 py-12">
                <p class="text-xl mb-2">📅</p>
                <p>No counters yet</p>
                <p class="text-sm">Click "Add New Counter" to get started!</p>
              </div>
            }
          >
            <CounterList counters={store.counters} onDelete={handleDeleteCounter} />
          </Show>
        </Show>
      </div>
      <Toaster />
    </main>
  );
}

export default App;
