import { useCallback, useEffect, useState } from 'react';
import { Popover, RangeSlider, Text, TextInput } from '@mantine/core';
import { IconCoin } from '@tabler/icons-react';
import { InputIcon } from '@/modules/core/components/shared/input-icon/InputIcon';
import { priceRangeFormat } from '@/modules/core/utils/priceRangeFormat';


type PriceRangeProps = {
    minRange: number,
    min: number,
    max: number,
    width: number
    value: [number, number],
    onReset?: () => void,
    onClose?: (values: [number, number]) => void
}

export const PriceRange: React.FC<PriceRangeProps> = (props) => {

    const [value, setValue] = useState<[number, number]>(props.value);
    const [currentPriceRange, setCurrentPriceRange] = useState<string>(`$${props.value[0]} - $${props.value[1]}`);
    const [startPrice, endPrice] = value;

    const updatePriceInputText = useCallback(() => setCurrentPriceRange(priceRangeFormat(startPrice, endPrice)), [startPrice, endPrice]);

    const onClosePopover = () => { 
        updatePriceInputText();
        props.onClose && props.onClose(value);
    }

    useEffect(() => {
        setValue(props.value);
        updatePriceInputText();
    }, [props.value]);

    return(<Popover width={300} trapFocus onClose={onClosePopover}>
            <Popover.Target>
                <div className='flex' style={{ width: props.width }}>
                    <TextInput label='Price Range'
                               rightSection={<InputIcon icon={IconCoin}
                               aria-label='show price range' />}
                               onChange={() => setCurrentPriceRange(priceRangeFormat(startPrice, endPrice))}
                               value={currentPriceRange} />
                </div>
            </Popover.Target>
            <Popover.Dropdown className='p-4'>
                <div className='flex flex-col justify-center'>
                    <RangeSlider minRange={props.minRange}
                                 min={props.min}
                                 max={props.max}
                                 defaultValue={value}
                                 onChange={(range) => setValue(range)} />
                    <div className='flex mt-3'>
                        <Text size='sm' className='font-semibold mr-1'>Price Range:</Text>
                        <Text size='sm'>{priceRangeFormat(startPrice, endPrice)}</Text>
                    </div>
                </div>
            </Popover.Dropdown>
           </Popover>)
}