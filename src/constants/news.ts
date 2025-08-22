// Category color mapping
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    '技術情報': 'bg-blue-500',
    'キャンペーン': 'bg-red-500',
    '新商品': 'bg-green-500',
    'イベント': 'bg-purple-500',
    '企業情報': 'bg-gray-600',
    'お知らせ': 'bg-orange-500',
  };
  return colors[category] || 'bg-gray-500';
};

// Date formatting utility
export const formatNewsDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Read time formatting
export const formatReadTime = (minutes: number): string => {
  return `${minutes}分で読める`;
};

// View count formatting
export const formatViewCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k回閲覧`;
  }
  return `${count}回閲覧`;
};