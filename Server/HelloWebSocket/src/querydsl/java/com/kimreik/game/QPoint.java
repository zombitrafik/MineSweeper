package com.kimreik.game;

import com.mysema.query.types.Path;
import com.mysema.query.types.PathMetadata;
import com.mysema.query.types.path.BeanPath;
import com.mysema.query.types.path.NumberPath;

import javax.annotation.Generated;

import static com.mysema.query.types.PathMetadataFactory.forVariable;

/**
 * QPoint is a Querydsl query type for Point
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QPoint extends BeanPath<Point>
{

	public static final QPoint			point				= new QPoint("point");
	private static final long			serialVersionUID	= 719758411L;
	public final NumberPath<Integer>	value				= createNumber("value", Integer.class);

	public final NumberPath<Integer>	x					= createNumber("x", Integer.class);

	public final NumberPath<Integer>	y					= createNumber("y", Integer.class);

	public QPoint(String variable)
	{
		super(Point.class, forVariable(variable));
	}

	public QPoint(Path<? extends Point> path)
	{
		super(path.getType(), path.getMetadata());
	}

	public QPoint(PathMetadata<?> metadata)
	{
		super(Point.class, metadata);
	}

}
