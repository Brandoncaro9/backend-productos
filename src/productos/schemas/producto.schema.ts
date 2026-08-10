import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductoDocument = HydratedDocument<Producto>;

@Schema({ timestamps: true })
export class Producto {
  @Prop({
    type: Number,
    unique: true,
    required: true,
  })
  id: number;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  nombre: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  descripcion: string;

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  precio: number;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);