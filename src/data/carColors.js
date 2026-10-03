export function carColors(car) {
  if (car.category !== 'taxi' && car.model === 'Camry') {
    return [
      { name: 'Белый', value: '#f8f8f8', image: 'camry' },
      { name: 'Чёрный', value: '#262626', image: 'camryBlack' },
    ];
  }
  if (car.category !== 'taxi' && car.model === 'Corolla') {
    return [
      { name: 'Серый', value: '#777', image: 'corolla' },
      { name: 'Белый', value: '#f8f8f8', image: 'corollaWhite' },
    ];
  }
  const color = car.image.startsWith('taxi')
    ? ['Жёлтый', '#f7d314']
    : ['kia', 'mazda', 'brilliance'].includes(car.image)
      ? ['Красный', '#bd1015']
      : car.image === 'karoq'
        ? ['Синий', '#146899']
        : car.image === 'octavia'
          ? ['Чёрный', '#262626']
          : ['Серебристый', '#bbb'];
  return [{ name: color[0], value: color[1], image: car.image }];
}
