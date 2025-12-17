import { ComponentType } from "react";

import styles from "./CurrencySelector.module.scss";
import { currencyNames } from "../../model/currenceExchangeModel/currenceExchangeModel";

interface CurrencySelectorProps {
  currency?: string;
  currentCurrency?: string;
  classNames?: string;
  onChange?: (arg: any) => void;
}

export const CurrencySelector: ComponentType<CurrencySelectorProps> = ({
  onChange,
  currency,
}) => {
  return (
    <form className={styles.currencySelectForm}>
      <select id="currencySelectElement" value={currency} onChange={onChange}>
        {currencyNames.map((el, i) => <option key={Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000} className={styles.currencyName}>{el}</option>)}
      </select>
    </form>
  );
}