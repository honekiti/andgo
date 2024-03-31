import { atomWithStorage, createJSONStorage, atomFamily } from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { OrderId, Order } from '../models';

const ORDER_KEY = 'ORDER_KEY';
const storage = createJSONStorage<Order | null>(() => AsyncStorage);

export const orderFamily = atomFamily((orderId: OrderId) => atomWithStorage(`${ORDER_KEY}:${orderId}`, null, storage, { getOnInit: true }));
