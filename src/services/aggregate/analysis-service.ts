import { store } from '../../store';
import { accountAtom } from '../account-service';
import { ordersAtom } from './calendar-service';
import type { SuccessOrderResult } from '../../models';

export const refreshTotalAmount = async () => {
  const orders = await store.get(ordersAtom);
  const filtered = orders.filter((o) => o.result.status === 'SUCCESS');

  // TODO: 実際の購入数量をAPI取得し、それベースで計算するようにする
  const totalBtcAmount = filtered.reduce((acc, order) => acc + (order.result as SuccessOrderResult).btcAmount, 0);
  const totalSpentAmount = filtered.reduce((acc, order) => acc + order.planSnapshot.quoteAmount, 0);

  const account = await store.get(accountAtom);
  await store.set(accountAtom, { ...account, totalBtcAmount, totalSpentAmount });
};
