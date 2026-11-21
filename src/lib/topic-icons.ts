import {
  Activity, ArrowRightLeft, Atom, Beaker, Bird, BookA, BookType, Boxes,
  Bug, CalendarDays, CircleDot, CircleGauge, CircuitBoard, Clock3, Divide,
  Dna, Equal, FlaskConical, Flower2, Gauge, Grip, HeartPulse, Languages,
  Layers3, Leaf, ListOrdered, MessageCircle, Microscope, Move, MoveDown,
  Orbit, PawPrint, Pi, PlugZap, Route, Scale, ScanLine, Sigma, Sprout,
  Sun, Timer, Weight, Zap, type LucideIcon,
} from 'lucide-react';

const topicIcons: Record<string, [LucideIcon, LucideIcon, LucideIcon]> = {
  'atom-tuzilishi': [Atom, Orbit, CircleDot],
  'kimyoviy-reaksiya': [FlaskConical, Atom, Beaker],
  'hujayra-tuzilishi': [Dna, CircleDot, Microscope],
  toqimalar: [Layers3, Dna, ScanLine],
  'organlar-sistemasi': [HeartPulse, Activity, Dna],
  mikroorganizmlar: [Microscope, Bug, Dna],
  'osimliklar-dunyosi': [Sprout, Leaf, Flower2],
  'hayvonot-dunyosi': [PawPrint, Bird, Leaf],
  fotosintez: [Sun, Leaf, Sprout],
  'tezlik-harakat': [Gauge, Route, Timer],
  'elektr-toki': [CircuitBoard, Zap, PlugZap],
  'massa-zichlik': [Weight, Scale, Boxes],
  bosim: [CircleGauge, Weight, MoveDown],
  'nyuton-qonunlari': [ArrowRightLeft, Move, Gauge],
  'ishqalanish-kuchi': [Grip, Move, Weight],
  'moddaning-molekulyar-holati': [Orbit, Boxes, Atom],
  'oddiy-kasrlar': [Divide, Pi, Sigma],
  'chiziqli-tenglama': [Equal, Sigma, Pi],
  'present-simple': [Clock3, BookA, MessageCircle],
  'past-simple': [CalendarDays, BookA, Clock3],
  'ot-rodi': [BookType, Languages, MessageCircle],
  kelishiklar: [ListOrdered, BookType, Languages],
};

export function getTopicIcons(topicId: string): [LucideIcon, LucideIcon, LucideIcon] {
  return topicIcons[topicId] ?? [Atom, Orbit, CircleDot];
}
