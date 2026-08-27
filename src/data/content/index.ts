import type { ToolContent } from './types';
import { dnsLookupContent } from './dns-lookup';
import { passwordGeneratorContent } from './password-generator';
import { qrGeneratorContent } from './qr-code-generator';
import { hashGeneratorContent } from './hash-generator';
import { base64ToolContent } from './base64-tool';
import { jsonFormatterContent } from './json-formatter';
import { uuidGeneratorContent } from './uuid-generator';
import { wordCounterContent } from './word-counter';
import { colorPickerContent } from './color-picker';
import { ipCheckContent } from './ip-check';
import { percentageCalculatorContent } from './percentage-calculator';
import { ageCalculatorContent } from './age-calculator';
import { tipCalculatorContent } from './tip-calculator';
import { timestampConverterContent } from './timestamp-converter';
import { urlEncoderContent } from './url-encoder';
import { caseConverterContent } from './case-converter';
import { baseConverterContent } from './base-converter';
import { randomNumberGeneratorContent } from './random-number-generator';
import { passwordStrengthContent } from './password-strength';
import { stopwatchContent } from './stopwatch';
import { countdownTimerContent } from './countdown-timer';
import { loremIpsumContent } from './lorem-ipsum';
import { dateDifferenceContent } from './date-difference';
import { temperatureConverterContent } from './temperature-converter';
import { caesarCipherContent } from './caesar-cipher';
import { morseCodeContent } from './morse-code';
import { alphabetizerContent } from './alphabetizer';
import { bmiCalculatorContent } from './bmi-calculator';
import { wordScrambleContent } from './word-scramble';
import { wordleSolverContent } from './wordle-solver';
import { regexTesterContent } from './regex-tester';
import { qrDecoderContent } from './qr-decoder';
import { fileHashContent } from './file-hash';
import { wifiQrGeneratorContent } from './wifi-qr-generator';
import { timezoneConverterContent } from './timezone-converter';
import { markdownToHtmlContent } from './markdown-to-html';
import { textToMarkdownContent } from './text-to-markdown';
import { csvJsonConverterContent } from './csv-json-converter';
import { htmlFormatterContent } from './html-formatter';
import { cronGeneratorContent } from './cron-generator';
import { spinWheelContent } from './spin-wheel';
import { unitConverterContent } from './unit-converter';
import { mortgageCalculatorContent } from './mortgage-calculator';
import { imageResizerContent } from './image-resizer';
import { jwtToolContent } from './jwt-tool';
import { httpHeadersContent } from './http-headers';
import { encodingInspectorContent, hexToolContent, unicodeEscapeToolContent, htmlEntityToolContent } from './encoding-tools';

const contents: Record<string, ToolContent> = {
  'dns-lookup': dnsLookupContent,
  'password-generator': passwordGeneratorContent,
  'qr-code-generator': qrGeneratorContent,
  'hash-generator': hashGeneratorContent,
  'base64-tool': base64ToolContent,
  'json-formatter': jsonFormatterContent,
  'uuid-generator': uuidGeneratorContent,
  'word-counter': wordCounterContent,
  'color-picker': colorPickerContent,
  'ip-check': ipCheckContent,
  'percentage-calculator': percentageCalculatorContent,
  'age-calculator': ageCalculatorContent,
  'tip-calculator': tipCalculatorContent,
  'timestamp-converter': timestampConverterContent,
  'url-encoder': urlEncoderContent,
  'case-converter': caseConverterContent,
  'base-converter': baseConverterContent,
  'random-number-generator': randomNumberGeneratorContent,
  'password-strength': passwordStrengthContent,
  'stopwatch': stopwatchContent,
  'countdown-timer': countdownTimerContent,
  'lorem-ipsum': loremIpsumContent,
  'date-difference': dateDifferenceContent,
  'temperature-converter': temperatureConverterContent,
  'caesar-cipher': caesarCipherContent,
  'morse-code': morseCodeContent,
  'alphabetizer': alphabetizerContent,
  'bmi-calculator': bmiCalculatorContent,
  'word-scramble': wordScrambleContent,
  'wordle-solver': wordleSolverContent,
  'regex-tester': regexTesterContent,
  'qr-decoder': qrDecoderContent,
  'file-hash': fileHashContent,
  'wifi-qr-generator': wifiQrGeneratorContent,
  'timezone-converter': timezoneConverterContent,
  'markdown-to-html': markdownToHtmlContent,
  'text-to-markdown': textToMarkdownContent,
  'csv-json-converter': csvJsonConverterContent,
  'html-formatter': htmlFormatterContent,
  'cron-generator': cronGeneratorContent,
  'spin-wheel': spinWheelContent,
  'unit-converter': unitConverterContent,
  'mortgage-calculator': mortgageCalculatorContent,
  'image-resizer': imageResizerContent,
  'jwt-tool': jwtToolContent,
  'http-headers': httpHeadersContent,
  'encoding-inspector': encodingInspectorContent,
  'hex-encoder': hexToolContent,
  'unicode-escape-tool': unicodeEscapeToolContent,
  'html-entity-tool': htmlEntityToolContent,
};

export function getContent(slug: string): ToolContent | undefined {
  return contents[slug];
}
