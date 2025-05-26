import {translate} from '@component/language';
import React, {FC, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Image} from 'react-native';
import {style} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BANK, MOMO, ZALOPAY} from '@constant/Payment';

interface DropdownMenuProps {
  onSelect: (option: string, paymentTag: string) => void;
}

const DropdownMenu: FC<DropdownMenuProps> = ({onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string, paymentTag: string) => {
    onSelect(option, paymentTag);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <ScrollView>
      <TouchableOpacity style={style.constainer} onPress={toggleDropdown}>
        <Text style={style.title}>
          {selectedOption || translate('payment.select')}
        </Text>
        {isOpen ? (
          <MaterialCommunityIcons name="chevron-up" size={20} />
        ) : (
          <MaterialCommunityIcons name="chevron-down" size={20} />
        )}
      </TouchableOpacity>

      {isOpen && (
        <View>
          <TouchableOpacity
            style={style.item}
            onPress={() =>
              handleOptionSelect(translate('payment.Bank')!, BANK)
            }>
            <Image
              style={style.logo}
              source={require('@UI/assets/brand-logo/bankLogo.png')}
            />
            <Text style={style.text}>{translate('payment.Bank')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.item}
            onPress={() =>
              handleOptionSelect(translate('payment.momo')!, MOMO)
            }>
            <Image
              style={style.logo}
              source={require('@UI/assets/brand-logo/momoLogo.png')}
            />
            <Text style={style.text}>{translate('payment.momo')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.item}
            onPress={() =>
              handleOptionSelect(translate('payment.zaloPay')!, ZALOPAY)
            }>
            <Image
              style={style.logo}
              source={require('@UI/assets/brand-logo/zaloPayLogo.png')}
            />
            <Text style={style.text}>{translate('payment.zaloPay')}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Rest of your content */}
    </ScrollView>
  );
};

export default DropdownMenu;
