import { ComponentType, useState } from "react";

import styles from "./NewCurrencySelector.module.scss";
import { currencyNames } from "../../model/currenceExchangeModel/currenceExchangeModel";

interface CurrencySelectorProps {
    currency: string;
    currentCurrency?: string;
    classNames?: string;
    onChange: (arg: any) => void;
    parentEvent?: (arg: any) => void;
}

export const NewCurrencySelector: ComponentType<CurrencySelectorProps> = ({
    onChange,
    currency,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const handler = (currency: string) => {
        onChange(currency);
        setIsOpen(false)
    }

    return (
        <div className={styles.content}>
            <p className={styles.currencyName} onClick={() => setIsOpen(!isOpen)}>{currency}</p>
            {isOpen ? <ul className={styles.currenciesDropdownMenu}>
                {currencyNames.map((el, i) => <li data-value={el} key={Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000} className={`${styles.currencyName} ${currency === el ? styles.selected : ""} ${styles.currencyInList}`} onClick={() => handler(el)}>{el}</li>)}
            </ul> : ""}
        </div>
    );
}