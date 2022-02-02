import React from 'react';
import {View} from 'react-native';
import {EvolutionDetail} from '../../models/Pokemon';
import {ColorTheme, useColor} from '../../utils/colors';
import EvolutionDetailText from './EvolutionDetailText';

interface EvolutionDetailListProps {
    data: EvolutionDetail;
    trigger: number;
}

const SPACING = 10;

export default function EvolutionDetailList({
    data,
    trigger,
}: EvolutionDetailListProps) {
    const headers = [
        'trigger',
        'min_level',
        'min_affection',
        'min_beauty',
        'min_happiness',
        'item',
        'held_item',
    ];
    const copyData = Object.keys(data).filter(key => headers.indexOf(key) < 0);
    const arr = [...headers, ...copyData];
    const background = useColor(
        ColorTheme.gray200,
        ColorTheme.whiteWithOpacity,
    );

    return (
        <View
            style={{
                paddingVertical: SPACING * 2,
                backgroundColor: background,
                borderRadius: SPACING,
                margin: SPACING,
            }}>
            {arr.map((key, index) => {
                if (index === 0) {
                    return (
                        <EvolutionDetailText
                            key={key}
                            label={`${key} #${trigger + 1}`}
                            value={data[key as keyof EvolutionDetail]}
                            border={index < arr.length - 1}
                            bold={true}
                        />
                    );
                }
                return (
                    <EvolutionDetailText
                        key={key}
                        label={key}
                        value={data[key as keyof EvolutionDetail]}
                        border={index < arr.length - 1}
                        bold={false}
                    />
                );
            })}
        </View>
    );
}
