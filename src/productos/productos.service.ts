import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  Producto,
  ProductoDocument,
} from './schemas/producto.schema';

import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectModel(Producto.name)
    private readonly productoModel: Model<ProductoDocument>,
  ) {}

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const ultimoProducto = await this.productoModel
      .findOne()
      .sort({ id: -1 })
      .exec();

    const nuevoId = ultimoProducto ? ultimoProducto.id + 1 : 1;

    const producto = new this.productoModel({
      id: nuevoId,
      ...createProductoDto,
    });

    return producto.save();
  }

  async findAll(): Promise<Producto[]> {
    return this.productoModel.find().sort({ id: 1 }).exec();
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoModel
      .findOne({ id })
      .exec();

    if (!producto) {
      throw new NotFoundException(
        `Producto con ID ${id} no encontrado`,
      );
    }

    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ): Promise<Producto> {
    const producto = await this.productoModel
      .findOneAndUpdate(
        { id },
        { $set: updateProductoDto },
        {
          new: true,
          runValidators: true,
        },
      )
      .exec();

    if (!producto) {
      throw new NotFoundException(
        `Producto con ID ${id} no encontrado`,
      );
    }

    return producto;
  }

  async remove(id: number): Promise<{ message: string }> {
    const producto = await this.productoModel
      .findOneAndDelete({ id })
      .exec();

    if (!producto) {
      throw new NotFoundException(
        `Producto con ID ${id} no encontrado`,
      );
    }

    return {
      message: `Producto con ID ${id} eliminado correctamente`,
    };
  }
}
