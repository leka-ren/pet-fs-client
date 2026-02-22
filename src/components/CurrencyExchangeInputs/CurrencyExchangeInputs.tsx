import { useStore } from "effector-react";
import { ComponentType } from "react";
import {
  $exchangeValueRes,
  $from,
  $fromValue,
  $to,
  setFrom,
  setFromValue,
  setTo,
} from "../../model/currenceExchangeModel/currenceExchangeModel";
import { CurrencySelector } from "../CurrencySelector/CurrencySelector";
import Input from "../ui/Input/Input";

import styles from "./CurrencyExchangeInputs.module.scss";
import { BlockTitle } from "../ui/BlockTitle/BlockTitle";

export const CurrencyExchangeInputs: ComponentType = () => {
  const from = useStore($from);
  const to = useStore($to);
  const fromValue = useStore($fromValue);
  const exchangeValueRes = useStore($exchangeValueRes);

  return (
    <div className={styles.content}>
      <BlockTitle title="Обмен валюты:" />
      <div className={styles.inputsContent}>
        <div className={styles.inputContent}>
          <CurrencySelector
            onChange={setFrom}
            classNames={styles.currencySelector}
            currency={from}
          />
          <Input
            onChange={setFromValue}
            value={fromValue}
            classNames={styles.input}
            placeholder="Валюта"
            typeInput={"number"}
          />
        </div>
        <div className={styles.inputContent}>
          <CurrencySelector
            classNames={styles.currencySelector}
            currency={to}
            onChange={setTo}
          />
          <Input
            disabled
            classNames={styles.input}
            placeholder="Сумма"
            value={exchangeValueRes}
          />
        </div>
      </div>
    </div>
  );
};
