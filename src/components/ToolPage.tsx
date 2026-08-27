import { lazy, Suspense, useEffect } from 'react';
import type { ComponentType } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toolBySlug } from '../data/tools';
import { getContent } from '../data/content';
import { ToolArticle } from './ContentSection';
import { ToolIcon } from './icons';
import './ToolPage.css';

/*
 * Every tool is lazy-loaded so it becomes its own chunk:
 *  - a failure in one tool can't take down the rest of the site
 *  - visitors only download the chunk for the tool they open
 */
const PasswordGenerator = lazy(() => import('../tools/PasswordGenerator').then(m => ({ default: m.PasswordGenerator })));
const UuidGenerator = lazy(() => import('../tools/UuidGenerator').then(m => ({ default: m.UuidGenerator })));
const QrGenerator = lazy(() => import('../tools/QrGenerator').then(m => ({ default: m.QrGenerator })));
const HashGenerator = lazy(() => import('../tools/HashGenerator').then(m => ({ default: m.HashGenerator })));
const Base64Tool = lazy(() => import('../tools/Base64Tool').then(m => ({ default: m.Base64Tool })));
const JsonFormatter = lazy(() => import('../tools/JsonFormatter').then(m => ({ default: m.JsonFormatter })));
const WordCounter = lazy(() => import('../tools/WordCounter').then(m => ({ default: m.WordCounter })));
const ColorPicker = lazy(() => import('../tools/ColorPicker').then(m => ({ default: m.ColorPicker })));
const DnsLookup = lazy(() => import('../tools/DnsLookup').then(m => ({ default: m.DnsLookup })));
const IpCheck = lazy(() => import('../tools/IpCheck').then(m => ({ default: m.IpCheck })));
const PercentageCalculator = lazy(() => import('../tools/PercentageCalculator').then(m => ({ default: m.PercentageCalculator })));
const AgeCalculator = lazy(() => import('../tools/AgeCalculator').then(m => ({ default: m.AgeCalculator })));
const TipCalculator = lazy(() => import('../tools/TipCalculator').then(m => ({ default: m.TipCalculator })));
const TimestampConverter = lazy(() => import('../tools/TimestampConverter').then(m => ({ default: m.TimestampConverter })));
const UrlEncoder = lazy(() => import('../tools/UrlEncoder').then(m => ({ default: m.UrlEncoder })));
const CaseConverter = lazy(() => import('../tools/CaseConverter').then(m => ({ default: m.CaseConverter })));
const BaseConverter = lazy(() => import('../tools/BaseConverter').then(m => ({ default: m.BaseConverter })));
const RandomNumberGenerator = lazy(() => import('../tools/RandomNumberGenerator').then(m => ({ default: m.RandomNumberGenerator })));
const PasswordStrength = lazy(() => import('../tools/PasswordStrength').then(m => ({ default: m.PasswordStrength })));
const Stopwatch = lazy(() => import('../tools/Stopwatch').then(m => ({ default: m.Stopwatch })));
const CountdownTimer = lazy(() => import('../tools/CountdownTimer').then(m => ({ default: m.CountdownTimer })));
const LoremIpsum = lazy(() => import('../tools/LoremIpsum').then(m => ({ default: m.LoremIpsum })));
const DateDifference = lazy(() => import('../tools/DateDifference').then(m => ({ default: m.DateDifference })));
const TemperatureConverter = lazy(() => import('../tools/TemperatureConverter').then(m => ({ default: m.TemperatureConverter })));
const CaesarCipher = lazy(() => import('../tools/CaesarCipher').then(m => ({ default: m.CaesarCipher })));
const MorseCode = lazy(() => import('../tools/MorseCode').then(m => ({ default: m.MorseCode })));
const Alphabetizer = lazy(() => import('../tools/Alphabetizer').then(m => ({ default: m.Alphabetizer })));
const BmiCalculator = lazy(() => import('../tools/BmiCalculator').then(m => ({ default: m.BmiCalculator })));
const WordScramble = lazy(() => import('../tools/WordScramble').then(m => ({ default: m.WordScramble })));
const WordleSolver = lazy(() => import('../tools/WordleSolver').then(m => ({ default: m.WordleSolver })));
const RegexTester = lazy(() => import('../tools/RegexTester').then(m => ({ default: m.RegexTester })));
const QrDecoder = lazy(() => import('../tools/QrDecoder').then(m => ({ default: m.QrDecoder })));
const FileHash = lazy(() => import('../tools/FileHash').then(m => ({ default: m.FileHash })));
const WifiQrGenerator = lazy(() => import('../tools/WifiQrGenerator').then(m => ({ default: m.WifiQrGenerator })));
const TimezoneConverter = lazy(() => import('../tools/TimezoneConverter').then(m => ({ default: m.TimezoneConverter })));
const MarkdownToHtml = lazy(() => import('../tools/MarkdownToHtml').then(m => ({ default: m.MarkdownToHtml })));
const TextToMarkdown = lazy(() => import('../tools/TextToMarkdown').then(m => ({ default: m.TextToMarkdown })));
const CsvJsonConverter = lazy(() => import('../tools/CsvJsonConverter').then(m => ({ default: m.CsvJsonConverter })));
const HtmlFormatter = lazy(() => import('../tools/HtmlFormatter').then(m => ({ default: m.HtmlFormatter })));
const CronGenerator = lazy(() => import('../tools/CronGenerator').then(m => ({ default: m.CronGenerator })));
const SpinWheel = lazy(() => import('../tools/SpinWheel').then(m => ({ default: m.SpinWheel })));
const UnitConverter = lazy(() => import('../tools/UnitConverter').then(m => ({ default: m.UnitConverter })));
const MortgageCalculator = lazy(() => import('../tools/MortgageCalculator').then(m => ({ default: m.MortgageCalculator })));
const ImageResizer = lazy(() => import('../tools/ImageResizer').then(m => ({ default: m.ImageResizer })));
const JwtTool = lazy(() => import('../tools/JwtTool').then(m => ({ default: m.JwtTool })));
const HttpHeaders = lazy(() => import('../tools/HttpHeaders').then(m => ({ default: m.HttpHeaders })));
const EncodingInspector = lazy(() => import('../tools/EncodingTools').then(m => ({ default: m.EncodingInspector })));
const HexTool = lazy(() => import('../tools/EncodingTools').then(m => ({ default: m.HexTool })));
const UnicodeEscapeTool = lazy(() => import('../tools/EncodingTools').then(m => ({ default: m.UnicodeEscapeTool })));
const HtmlEntityTool = lazy(() => import('../tools/EncodingTools').then(m => ({ default: m.HtmlEntityTool })));
const TextDiffTool = lazy(() => import('../tools/BatchTools').then(m => ({ default: m.TextDiff })));
const YamlJsonTool = lazy(() => import('../tools/BatchTools').then(m => ({ default: m.YamlJson })));
const SqlFormatterTool = lazy(() => import('../tools/BatchTools').then(m => ({ default: m.SqlFormatter })));
const XmlFormatterTool = lazy(() => import('../tools/BatchTools').then(m => ({ default: m.XmlFormatter })));
const ContrastCheckerTool = lazy(() => import('../tools/BatchTools').then(m => ({ default: m.ContrastChecker })));
const UrlParserTool = lazy(() => import('../tools/BatchTools').then(m => ({ default: m.UrlParser })));
const ExifViewerTool = lazy(() => import('../tools/BatchTools').then(m => ({ default: m.ExifViewer })));
const SvgOptimizerTool = lazy(() => import('../tools/BatchTools').then(m => ({ default: m.SvgOptimizer })));
const UnixPermissionsTool = lazy(() => import('../tools/BatchTools').then(m => ({ default: m.UnixPermissions })));
const CssFormatterTool = lazy(() => import('../tools/BatchTools').then(m => ({ default: m.CssFormatter })));

const toolComponents: Record<string, ComponentType> = {
  'password-generator': PasswordGenerator,
  'uuid-generator': UuidGenerator,
  'qr-code-generator': QrGenerator,
  'hash-generator': HashGenerator,
  'base64-tool': Base64Tool,
  'json-formatter': JsonFormatter,
  'word-counter': WordCounter,
  'color-picker': ColorPicker,
  'dns-lookup': DnsLookup,
  'ip-check': IpCheck,
  'percentage-calculator': PercentageCalculator,
  'age-calculator': AgeCalculator,
  'tip-calculator': TipCalculator,
  'timestamp-converter': TimestampConverter,
  'url-encoder': UrlEncoder,
  'case-converter': CaseConverter,
  'base-converter': BaseConverter,
  'random-number-generator': RandomNumberGenerator,
  'password-strength': PasswordStrength,
  'stopwatch': Stopwatch,
  'countdown-timer': CountdownTimer,
  'lorem-ipsum': LoremIpsum,
  'date-difference': DateDifference,
  'temperature-converter': TemperatureConverter,
  'caesar-cipher': CaesarCipher,
  'morse-code': MorseCode,
  'alphabetizer': Alphabetizer,
  'bmi-calculator': BmiCalculator,
  'word-scramble': WordScramble,
  'wordle-solver': WordleSolver,
  'regex-tester': RegexTester,
  'qr-decoder': QrDecoder,
  'file-hash': FileHash,
  'wifi-qr-generator': WifiQrGenerator,
  'timezone-converter': TimezoneConverter,
  'markdown-to-html': MarkdownToHtml,
  'text-to-markdown': TextToMarkdown,
  'csv-json-converter': CsvJsonConverter,
  'html-formatter': HtmlFormatter,
  'cron-generator': CronGenerator,
  'spin-wheel': SpinWheel,
  'unit-converter': UnitConverter,
  'mortgage-calculator': MortgageCalculator,
  'image-resizer': ImageResizer,
  'jwt-tool': JwtTool,
  'http-headers': HttpHeaders,
  'encoding-inspector': EncodingInspector,
  'hex-encoder': HexTool,
  'unicode-escape-tool': UnicodeEscapeTool,
  'html-entity-tool': HtmlEntityTool,
  'text-diff': TextDiffTool,
  'yaml-json': YamlJsonTool,
  'sql-formatter': SqlFormatterTool,
  'xml-formatter': XmlFormatterTool,
  'contrast-checker': ContrastCheckerTool,
  'url-parser': UrlParserTool,
  'exif-viewer': ExifViewerTool,
  'svg-optimizer': SvgOptimizerTool,
  'unix-permissions': UnixPermissionsTool,
  'css-formatter': CssFormatterTool,
};

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? toolBySlug(slug) : undefined;

  useEffect(() => {
    if (tool) {
      document.title = `${tool.name} — NAB Tools`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', tool.seoDescription);
    } else {
      document.title = 'Tool not found — NAB Tools';
    }
    return () => { document.title = 'NAB Tools — Free Online Tools, 100% in Your Browser'; };
  }, [tool]);

  if (!tool) {
    return (
      <div className="tool-page not-found">
        <h1>Tool not found</h1>
        <p>The tool you're looking for doesn't exist (yet).</p>
        <Link to="/" className="btn">← Back to all tools</Link>
      </div>
    );
  }

  const ToolComponent = toolComponents[tool.slug];
  const content = getContent(tool.slug);

  return (
    <div className="tool-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link> <span>/</span> <span>{tool.name}</span>
      </nav>

      <header className="tool-header">
        <div className="tool-header-icon"><ToolIcon name={tool.icon} size={28} /></div>
        <div>
          <h1>{tool.name}</h1>
          <p>{tool.description}</p>
        </div>
      </header>

      <div className="tool-body">
        {ToolComponent ? (
          <Suspense fallback={<div className="tool-loading">Loading tool…</div>}>
            <ToolComponent />
          </Suspense>
        ) : (
          <p>This tool is under construction.</p>
        )}
      </div>

      {content && <ToolArticle content={content} />}
    </div>
  );
}
