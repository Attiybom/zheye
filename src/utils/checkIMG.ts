import { ColumnProps, ImageProps, UserProps } from '@/store/store'
export function generateFitUrl(column: ColumnProps, width: number, height: number) {
  if (column.avatar) {
    column.avatar.fitUrl = column.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50'
  } else {
    column.avatar = {
      fitUrl: require('@/assets/column.jpg')
    }
  }
}

interface CheckIMGCondition {
  format?: string[]
  size?: number
}

type ErrorType = 'size' | 'format' | null
export function beforeUploadCheck(file: File, condition: CheckIMGCondition) {
  const { format, size } = condition
  const isValidFormat: boolean = format ? format.includes(file.type) : true
  const isValidSize: boolean = size ? file.size / 1024 / 1024 < size : true
  let error: ErrorType = null
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}
