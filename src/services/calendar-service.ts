import { atom } from 'jotai';
import { unwrap } from 'jotai/utils';
import { accountAtom } from './account-service';
import { orderFamily } from './order-service';
import type { Order, OrderId } from '../models';

export const ordersAtom = unwrap(
  atom(async (get) => {
    const account = await get(accountAtom);
    const orders = await Promise.all(
      Array.from({ length: account.numOfOrders }, async (_, i) => {
        const id = `ORD_${i}` as OrderId;
        const res = await get(orderFamily(id));

        if (res === null) {
          console.warn(`Order not found: ${id}`);
        }

        return res;
      }),
    );

    // 存在しないものを取り除く
    const filtered = orders.filter((o) => o !== null) as Order[];

    return filtered;
  }),
  (prev) => prev ?? [],
);
