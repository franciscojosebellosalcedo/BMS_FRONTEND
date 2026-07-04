import { useEffect, useState, type FC } from "react";
import { regexStringHaveContent } from "../utils/regex";
import { useAntiSpam } from "../hooks/useAntiSpam";

type Props = {
    className: string
    placeholder: string;
    valueSearch?: string;
    handlerSearch: (value: string) => void;
    handlerResetSearch: Function
    setValueSearch: (value: string) => void;
    refInput?: any;
    withProp?: string;
    clearFocus?: boolean
    notIconSearch?: boolean;
    withBorder?: boolean;
    isWithEventEnter?: boolean;
    isWithMarginRight?: boolean;
};

const Search: FC<Props> = ({
    className,
    placeholder,
    handlerSearch,
    handlerResetSearch,
    refInput,
    withProp,
    clearFocus,
    notIconSearch,
    withBorder = false,
    setValueSearch,
    isWithEventEnter = true,
    valueSearch,
    isWithMarginRight
}) => {

    const [value, setValue] = useState<string>('');

    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    const { runWithLock } = useAntiSpam();

    const cleanLikeValue = (value: string) => {
        return value
            .replace(/[%_]/g, '')
            .trim();
    };

    const handlerInputSearch = (val: string) => {
        setValue(val);
        setValueSearch(val);

        if (regexStringHaveContent.test(val)) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
            handlerResetSearch();
        }
    };

    useEffect(() => {
        if (!valueSearch) return;

        setValue(valueSearch);

        if (regexStringHaveContent.test(valueSearch)) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [valueSearch]);

    return (
        <div
            className={`d-flex align-items-center mb-sm-0 ${className}`}
            style={{ marginRight: isWithMarginRight ? '30px' : '0px' }}
        >
            <div className="input-group">
                <input
                    autoFocus
                    type="search"
                    ref={refInput}
                    value={value}
                    placeholder={placeholder}
                    className={`form-control ${withBorder ? '' : 'form-control-solid'
                        } w-${withProp ?? '250px'}`}
                    onInput={(e) => handlerInputSearch(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (!isWithEventEnter) return;

                        if (e.key === 'Enter') {

                            e.preventDefault();
                            e.stopPropagation();

                            if (!regexStringHaveContent.test(value)) return;

                            runWithLock(() => {

                                const vSearch = cleanLikeValue(value);

                                handlerSearch(vSearch);

                            });

                            if (clearFocus) {

                                (document.activeElement as HTMLElement)?.blur();

                            }
                        }
                    }}
                />

                {
                    notIconSearch ? "" :
                        <button
                            type="button"
                            disabled={isDisabled}
                            className="btn btn-icon btn-icon-primary ms-2"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                if (clearFocus) {

                                    (document.activeElement as HTMLElement)?.blur();

                                }
                            }}
                            onClick={() => {

                                const vSearch = cleanLikeValue(value);

                                handlerSearch(vSearch);

                            }}
                        >
                            <i className="bi bi-search fs-6 cursor-pointer"></i>
                        </button>
                }

            </div>
        </div>
    );
};

export default Search;
