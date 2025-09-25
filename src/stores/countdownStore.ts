import { createStore, produce } from "solid-js/store";

export interface Counter {
    _id: string;
    name: string;
    targetDate: string;
    description?: string;
    createdAt?: string;
    isActive?: boolean;
}

export interface CountdownData extends Counter {
    timeLeft: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
    isExpired: boolean;
}

interface CountdownStoreState {
    counters: CountdownData[];
    isLoading: boolean;
    error: string | null;
}

export const [store, setStore] = createStore<CountdownStoreState>({
    counters: [],
    isLoading: false,
    error: null,
});

let intervalId: number | undefined;

export const calculateTimeLeft = (targetDate: string) => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isExpired: true
        };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isExpired: false
    };
};

export const updateCountdowns = () => {
    setStore(
        produce((state) => {
            state.counters = state.counters.map(counter => {
                const timeData = calculateTimeLeft(counter.targetDate);
                return {
                    ...counter,
                    timeLeft: {
                        days: timeData.days,
                        hours: timeData.hours,
                        minutes: timeData.minutes,
                        seconds: timeData.seconds
                    },
                    isExpired: timeData.isExpired
                };
            });
        })
    );
};

export const startCountdown = () => {
    if (intervalId) {
        clearInterval(intervalId);
    }
    
    intervalId = setInterval(updateCountdowns, 1000) as unknown as number;
    // Update immediately
    updateCountdowns();
};

export const stopCountdown = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
    }
};

export const setCounters = (counters: Counter[]) => {
    setStore(
        produce((state) => {
            state.counters = counters.map(counter => {
                const timeData = calculateTimeLeft(counter.targetDate);
                return {
                    ...counter,
                    timeLeft: {
                        days: timeData.days,
                        hours: timeData.hours,
                        minutes: timeData.minutes,
                        seconds: timeData.seconds
                    },
                    isExpired: timeData.isExpired
                };
            });
        })
    );
};

export const addCounter = (counter: Counter) => {
    setStore(
        produce((state) => {
            const timeData = calculateTimeLeft(counter.targetDate);
            state.counters.push({
                ...counter,
                timeLeft: {
                    days: timeData.days,
                    hours: timeData.hours,
                    minutes: timeData.minutes,
                    seconds: timeData.seconds
                },
                isExpired: timeData.isExpired
            });
        })
    );
};

export const removeCounter = (id: string) => {
    setStore(
        produce((state) => {
            state.counters = state.counters.filter(counter => counter._id !== id);
        })
    );
};

export const setLoading = (loading: boolean) => {
    setStore("isLoading", loading);
};

export const setError = (error: string | null) => {
    setStore("error", error);
};
