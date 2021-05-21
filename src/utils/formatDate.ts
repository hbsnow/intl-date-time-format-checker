/**
 * 秒を0にしてISO形式にフォーマットする
 *
 * 秒を0にしないと一部ブラウザのdatetimeのフォームで秒が表示されてしまうため
 */
export const formatDate = (date: Date): string => {
  date.setSeconds(0);
  return date.toISOString().split(".")[0];
};
