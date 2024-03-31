import invariant from 'tiny-invariant';
import { atom } from 'jotai';
import { accountAtom } from './account-service';
import { orderFamily } from './order-service';
import type { OrderId } from '../models';

export const ordersAtom = atom(async (get) => {
  const account = await get(accountAtom);
  const orders = Array.from({ length: account.numOfOrders }, async (_, i) => {
    const id = `ORD_${i}` as OrderId;
    const res = await get(orderFamily(id));
    invariant(res, `Order not found: ${id}`);
    return res;
  });
  return orders;
});
